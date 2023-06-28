const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");


// Create new Order
module.exports.newOrder = async (req, res, next) => {
    try{
        const {
            shippingInfo,
            orderItems,
            paymentInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        } = req.body;

        const order = await Order.create({
            shippingInfo,
            orderItems,
            paymentInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            paidAt: Date.now(),
            user: req.user._id,
        });

        return res.status(201).json({
            success: true,
            order,
        });

    }catch(err){
        console.log("err in order", err);
        return res.status(500).send({
            success:true,
            message:'Internal server error'
        })
    }
   
};

// get Single Order
module.exports.getSingleOrder = async (req, res, next) => {
    try{
        const order = await Order.findById(req.params.id).populate(
            "user",
            "name email"
        );

        if (!order) {
            return next(new ErrorHandler("Order not found with this Id", 404));
        }

        return res.status(200).json({
            success: true,
            order,
        });

    }catch(err){
        console.log("err in order", err);
        return res.status(500).send({
            success:true,
            message:'Internal server error'
        })
    }
   
};

// get logged in user  Orders
module.exports.myOrders = async (req, res, next) => {
    try{
        const orders = await Order.find({ user: req.user._id });

        res.status(200).json({
            success: true,
            orders,
        });

    }catch(err){
        console.log("err in order", err);
        return res.status(500).send({
            success:true,
            message:'Internal server error'
        })
    }
  
};

// get all Orders -- Admin
module.exports.getAllOrders = async (req, res, next) => {
    try{
        const orders = await Order.find();

        let totalAmount = 0;

        orders.forEach((order) => {
            totalAmount += order.totalPrice;
        });

        res.status(200).json({
            success: true,
            totalAmount,
            orders,
        });

    }catch(err){
        console.log("err in order", err);
        return res.status(500).send({
            success:true,
            message:'Internal server error'
        })
    }
  
};

// update Order Status -- Admin
module.exports.updateOrder = async (req, res, next) => {
    try{
        const order = await Order.findById(req.params.id);

        if (!order) {
            return next(new ErrorHandler("Order not found with this Id", 404));
        }

        if (order.orderStatus === "Delivered") {
            return next(new ErrorHandler("You have already delivered this order", 400));
        }

        if (req.body.status === "Shipped") {
            order.orderItems.forEach(async (o) => {
                await updateStock(o.product, o.quantity);
            });
        }
        order.orderStatus = req.body.status;

        if (req.body.status === "Delivered") {
            order.deliveredAt = Date.now();
        }

        await order.save({ validateBeforeSave: false });
        res.status(200).json({
            success: true,
        });

    }catch(err){
        console.log("err in order", err);
        return res.status(500).send({
            success:true,
            message:'Internal server error'
        })
    }
 
};

async function updateStock(id, quantity) {
    try{
        const product = await Product.findById(id);

        product.Stock -= quantity;

        await product.save({ validateBeforeSave: false });

    }catch(err){
        console.log("err in order", err);
        return res.status(500).send({
            success:true,
            message:'Internal server error'
        })
    }
  
}

// delete Order -- Admin
module.exports.deleteOrder = async (req, res, next) => {
    try{
        const order = await Order.findById(req.params.id);

        if (!order) {
            return next(new ErrorHandler("Order not found with this Id", 404));
        }

        await Order.findByIdAndDelete(req.params.id)

        res.status(200).json({
            success: true,
        });
    }catch(err){
        console.log("err in order", err);
        return res.status(500).send({
            success:true,
            message:'Internal server error'
        })
    }
   
};