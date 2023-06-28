const express = require('express');
const router = express.Router();
const orderRouter = require('../controllers/orderController');
const passport = require('passport');
const { checkAdmin } = require('../middlewares/checkAdmin');




router.post("/new", passport.authenticate('jwt', { session: false }), orderRouter.newOrder)

router.get("/me", passport.authenticate('jwt', { session: false }), orderRouter.myOrders)

router.get("/admin/orders", passport.authenticate('jwt', { session: false }), checkAdmin, orderRouter.getAllOrders)

router.put("/admin/order/:id", passport.authenticate('jwt', { session: false }), checkAdmin, orderRouter.updateOrder)
    

router.delete("/admin/order/:id", passport.authenticate('jwt', { session: false }), checkAdmin, orderRouter.deleteOrder)

router.get("/:id", passport.authenticate('jwt', { session: false }), orderRouter.getSingleOrder)









module.exports = router