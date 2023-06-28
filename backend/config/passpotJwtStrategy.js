const passport = require('passport');
const User=require('../models/userModel')

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';


passport.use(new JwtStrategy(opts, async function (jwt_payload, done) {
       
    try{
      
        const user = await User.findById(jwt_payload._id);
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }

    }catch(err){
        console.log("err in passport", err);
        return done(err, false)
    }
}));


module.exports=passport