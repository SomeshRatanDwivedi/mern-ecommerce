const Product=require('../models/productModel');
const ApiFeatures = require('../utils/apiFeatures');
const ErrorHandler = require('../utils/errorHandler');

module.exports.createProduct=async(req, res)=>{
    try{
        const newProduct = await Product.create(req.body);
        return res.status(200).send({
            success:true,
            data:{
                newProduct
            }
        })

    }catch(error){
        console.log("error in createing project", error);
        return res.status(500).send({
            message:error.message,
            success:false
        })
    }
   

}


module.exports.getAllProducts=async(req, res)=>{
    

    try{
        const productsCount = await Product.countDocuments();
        const apiFeatures=new ApiFeatures(Product.find(), req.query).search().filter()
        let products=await apiFeatures.query;
        const filteredProductsCount=products.length;
        apiFeatures.pagination(8);

        products = await apiFeatures.query.clone();


        return res.status(200).send({
            message: "All products",
            data:{
               products,
               productsCount,
               filteredProductsCount
            },
            success:true
        })

    }catch(error){
        console.log("error in getting all product", error);
        return res.status(500).send({
            message: "Internal server error",
            success: false
        })
    }
     
}


module.exports.deleteProduct=async(req, res, next)=>{

    try{

        const product = await Product.findById(req.params.id);

        if (!product) {
            return next(new ErrorHandler("Product not found", 404));
        }

        await Product.findByIdAndDelete(req.params.id)

        return res.status(200).send({
            success:true,
            message:"Product is deleted"
        })

    } catch (error) {
        console.log("error in deleting product", error);
        return res.status(500).send({
            message: "Internal server error",
            success: false
        })
    }
}

module.exports.getProductDetails=async(req, res, next)=>{
    try{

        const product = await Product.findById(req.params.id);

        if (!product) {
            return next(new ErrorHandler("Product not found", 404));
        }

        return res.status(200).send({
            success: true,
            data:{
                product
            },
            message: "Product found"
        })

    } catch (error) {
        console.log("error in getting product details", error);
        return res.status(500).send({
            message: "Internal server error",
            success: false
        })
    }
}

module.exports.editProduct=async(req, res)=>{
    try{
        const product = await Product.findById(req.params.id);
        

    }catch(error){
        console.log("error in editing product", error);
        return res.status(500).send({
            message: "Internal server error",
            success: false
        })
    }
}