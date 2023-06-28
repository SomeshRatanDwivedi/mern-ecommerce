const mongoose=require('mongoose');

mongoose.connect("mongodb://localhost/ecom-db")
.then((data)=>{
    console.log(`db is connected`)
})
.catch(error=>{
    console.log("error in connecting db", error)
})


module.exports=mongoose;