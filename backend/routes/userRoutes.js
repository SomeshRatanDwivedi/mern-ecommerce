const express=require('express');
const router=express.Router();

const userController=require('../controllers/userController');
const passport=require('passport');
const { checkAdmin } = require('../middlewares/checkAdmin');

router.post('/login', userController.login);

router.post('/signup', userController.signup);

router.post('/edit', passport.authenticate('jwt',{session:false}),userController.editProfile)

router.get('/get_my_details', passport.authenticate('jwt', { session: false }), checkAdmin, userController.getMyDetails);

router.get('/admin/get_all_users', passport.authenticate('jwt', { session: false }), userController.getAllUser);

router.get('/get_single_user/:id', passport.authenticate('jwt', { session: false }), userController.getSingleUser);

router.put('/admin/update_user_role/:id', passport.authenticate('jwt', { session: false }), checkAdmin, userController.updateUserRole);

router.delete('/admin/delete_user/:id', passport.authenticate('jwt', { session: false }), checkAdmin, userController.deleteUser);

router.put('/update-password', passport.authenticate('jwt', {session:false}), userController.updatePassword);

router.post('/forgot-password', userController.forgotPassword);

router.put('/reset-password/:token', userController.resetPassword)














module.exports=router