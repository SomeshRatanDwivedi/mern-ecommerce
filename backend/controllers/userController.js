const User=require('../models/userModel');
const ErrorHandler = require('../utils/errorHandler');
const upload=require('../config/multer');
const getDataUri=require('../config/dataUri');
const cloudinary=require('cloudinary');
const sendEmail = require('../config/nodemailer');
const crypto=require('crypto')

module.exports.signup=async(req, res, next)=>{
    upload(req, res, async(err)=>{
        try {

            const { name, email, password } = req.body;

            const userAlreadyExist = await User.findOne({ email });


            if (userAlreadyExist) {
                return next(new ErrorHandler("User already exist", 409));
            }
            
            const fileUri = getDataUri(req.file);
            const myCloud = await cloudinary.v2.uploader.upload(fileUri.content)
            const userAvatar = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            }

            const newUser = await User.create({
                name,
                email,
                password,
                avatar: userAvatar
            })

            return res.status(200).send({
                success: true,
                data: {
                    newUser
                },
                message: 'New user created'
            })

        } catch (err) {
            console.log("err in signup", err);
            return res.status(500).send({
                success: false,
                message: 'Internal server error'
            })
        }

    })
}

module.exports.login = async (req, res, next) => {
    try {
         const {email, password}=req.body;

         const user=await User.findOne({email}).select('+password')
         if(!user){
            return next(new ErrorHandler("User not found", 404));
         }

         const isPasswordMatch=await user.checkPassword(password);

         if(!isPasswordMatch){
             return next(new ErrorHandler("Invalid email or password", 404));
         }

         const jwt=user.getJWTToken();

         return res.status(200).send({
            success:true,
            message:"User successfully logged in",
            data:{
                user,
                token:jwt
            }
          
         })

    } catch (err) {
        console.log("err in login", err);
        return res.status(500).send({
            success: false,
            message: 'Internal server error'
        })
    }
}


module.exports.editProfile = async (req, res) => {
        upload(req, res, async(err)=>{
           try{
              
               const id = req.user._id;
               let user=await User.findById(id)
               let newUserData = {
                   name: req.body.name,
                   email: req.body.email,
               };

               if (req.file) {
                   
                   if(user.avatar && user.avatar.public_id){
                         await cloudinary.v2.uploader.destroy(user.avatar.public_id)
                   }
                   const fileUri = getDataUri(req.file);
                   const myCloud = await cloudinary.v2.uploader.upload(fileUri.content)
                   const userNewAvatar = {
                       public_id: myCloud.public_id,
                       url: myCloud.secure_url,
                   }
                   newUserData.avatar = userNewAvatar;
               }

              user=await User.findByIdAndUpdate(id, newUserData, {
                   new: true,
                   runValidators: true,
                   useFindAndModify: false,
               });

               const token =user.getJWTToken();

               return res.status(200).send({

                   success: true,
                   message: "User is edited",
                   data:{
                      token
                   }
               })

           }catch(err){

               console.log("err in edit profile", err);
               return res.status(500).send({
                   success: false,
                   message: 'Internal server error'
               })
           }

        })
}


module.exports.getMyDetails = async (req, res, next) => {
    try{
        const user = await User.findById(req.user._id);

        return res.status(200).json({
            success: true,
            user,
        });

    }catch(err){
        console.log("err in update", err);
        return res.status(500).send({
            success:false,
            message:'Internal server error'
        })
    }
 
};

module.exports.getAllUser = async (req, res, next) => {
    try{
        const users = await User.find();

        res.status(200).json({
            success: true,
            users,
        });
    }catch(err){
        console.log("err in update", err);
        return res.status(500).send({
            success:false,
            message:'Internal server error'
        })
    }

};


module.exports.getSingleUser = async (req, res, next) => {
    try{
        const user = await User.findById(req.params.id);

        if (!user) {
            return next(
                new ErrorHandler(`User does not exist with Id: ${req.params.id}`)
            );
        }

        res.status(200).json({
            success: true,
            user,
        });

    }catch(err){
        console.log("err in update", err);
        return res.status(500).send({
            success:false,
            message:'Internal server error'
        })
    }
   
};


module.exports.updateUserRole = async (req, res, next) => {
    try{
        const newUserData = {
            name: req.body.name,
            email: req.body.email,
            role: req.body.role,
        };

        await User.findByIdAndUpdate(req.params.id, newUserData, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        });

        res.status(200).json({
            success: true,
        });

    }catch(err){
        console.log("err in update", err);
        return res.status(500).send({
            success:false,
            message:'Internal server error'
        })
    }
   
};



module.exports.deleteUser = async (req, res, next) => {
    try{
        const user = await User.findById(req.params.id);

        if (!user) {
            return next(
                new ErrorHandler(`User does not exist with Id: ${req.params.id}`, 400)
            );
        }

        // const imageId = user.avatar.public_id;

        // await cloudinary.v2.uploader.destroy(imageId);

        await User.findByIdAndDelete(req.params.id)

        return res.status(200).json({
            success: true,
            message: "User Deleted Successfully",
        });

    }catch(err){
        console.log("err in update", err);
        return res.status(500).send({
            success:false,
            message:'Internal server error'
        })
    }
   
};



module.exports.updatePassword=async(req, res, next)=>{
    try{
        const {oldPassword, newPassword}=req.body;
        const user=await User.findById(req.user._id).select("+password");
        const isPasswordMatch=await user.checkPassword(oldPassword);
        
        console.log(oldPassword, isPasswordMatch, newPassword)

        if(!isPasswordMatch){
            return next(new ErrorHandler(`Username/ password is not matching`, 400));
        }

        user.password=newPassword;

        await user.save({ validateBeforeSave: false });

        const token=user.getJWTToken();

        return res.status(200).send({
            success:true,
            message:"Your password is updated",
            data:{
                token
            }
        });


    }catch(error){
        console.log("err in updating password", error);
        return res.status(500).send({
            message:"Internal server error",
            success:false
        })
    }
}


module.exports.forgotPassword=async(req, res, next)=>{
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    // Get ResetPassword Token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `http://localhost:3000/password/reset/${resetToken}`;

    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

    try {
        await sendEmail({
            email: user.email,
            subject: `Ecommerce Password Recovery`,
            message,
        });

        return res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`,
        });
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });
        console.log("err forgot password",error)

        return next(new ErrorHandler(error.message, 500));
    }
}

module.exports.resetPassword=async(req, res, next)=>{
    try{

        const { token } = req.params;

        const { newPassword, confirmNewPassword } = req.body;

        const resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex');

        const currentTime = Date.now();

        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: currentTime }
        })

        if (!user) {
            return next(new ErrorHandler("Reset Password Token is invalid or has been expired",
                400))
        }

        if (newPassword != confirmNewPassword) {
            return next(new ErrorHandler("Password and Confirm password is not matching", 400));
        }

        user.password = newPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        return res.status(200).send({
            success:true,
            message:"Your password is reset"
        })
    }catch(error){
        console.log("err in reset password", error);
        return next(new ErrorHandler(error.message, 500))
    }
   
}