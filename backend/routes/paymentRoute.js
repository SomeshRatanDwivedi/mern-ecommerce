const express=require('express');

const router=express.Router();

const paymentController=require('../controllers/paymentControllers');
const passport=require('passport');

router.post('/process', passport.authenticate('jwt', {session:false}), paymentController.processPayment);



























module.exports=router;