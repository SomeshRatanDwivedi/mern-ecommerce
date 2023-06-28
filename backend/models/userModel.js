const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Your Name"],
        maxLength: [30, "Name cannot exceed 30 characters"],
        minLength: [4, "Name should have more than 4 characters"],
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,
        validate: [validator.isEmail, "Please Enter a valid Email"],
    },
    password: {
        type: String,
        required: [true, "Please Enter Your Password"],
        minLength: [6, "Password should be greater than 8 characters"],
        select: false,
    },
    avatar: {
            public_id:{
                type:String,
                required: [true, "Please give public id for image"]
            },
            url:{
                type:String,
                required: [true, "Please give the url of image"]
            }
    },
    role: {
        type: String,
        default: "user",
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
},
{
    timestamps:true
});


userSchema.pre("save", async function(next){
    if(!this.isModified('password')){
        return next()
    }
    this.password=await bcrypt.hash(this.password, 10);
    next();
})

userSchema.methods.checkPassword=async function(userGivenPassword){
    return await bcrypt.compare(userGivenPassword, this.password)
 
}

userSchema.methods.getJWTToken=function(){
    let user=this._doc;
    delete user['password'];
   return jwt.sign(user, "secret", {
    expiresIn:2*60*60*1000
   })
}

userSchema.methods.getResetPasswordToken = function () {
    // Generating Token
    const resetToken = crypto.randomBytes(20).toString("hex");

    // Hashing and adding resetPasswordToken to userSchema
    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    return resetToken;
};


const User=mongoose.model('User', userSchema);

module.exports=User