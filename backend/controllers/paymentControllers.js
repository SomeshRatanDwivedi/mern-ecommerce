const stripe=require("stripe")(process.env.STRIPE_SECRET_KEY);


module.exports.processPayment=async(req, res)=>{
    try{

        const myPayment=await stripe.paymentIntents.create({
            amount:req.body.amount,
            currency:"inr",
            metadata:{
                company:"Sastasaman"
            }
        });

        return res.status(200).send({
            success:true,
            mesage:"payment succesfull",
            data:{
                client_secret:myPayment.client_secret
            }
        })

    }catch(error){
        console.log("err in paymant", error);
        return res.status(500).send({
          success:false,
          message:"Internal server error"
        })
    }
}