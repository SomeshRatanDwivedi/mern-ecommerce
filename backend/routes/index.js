const express=require('express');
const router=express.Router();

router.get('/', (req, res)=>{
    return res.status(200).send({
        message:"Hello World"
    })
})


router.use('/product', require('./productRoutes'));
router.use('/user', require('./userRoutes'));
router.use('/order', require('./orderRoutes'));
router.use('/payment', require('./paymentRoute'))







module.exports=router;