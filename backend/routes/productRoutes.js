const express=require('express');
const router=express.Router();
const productController=require('../controllers/productController')



router.get('/products', productController.getAllProducts)

router.post('/new', productController.createProduct)

router.delete('/delete/:id', productController.deleteProduct)

router.get('/:id', productController.getProductDetails);




















module.exports=router;