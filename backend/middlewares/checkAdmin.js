
module.exports.checkAdmin=(req, res, next)=>{
    if(req.user.role=='Admin'){
        return next()
    }
    return res.status(401).send({
        message:'Unautherised'
    })
}