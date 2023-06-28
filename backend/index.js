const dotenv=require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(__dirname, '.env') });
const env = require('./config/environment');


const express = require('express');
const db=require('./config/mongoose')
const passportJWT=require('./config/passpotJwtStrategy')
const bodyParser=require('body-parser');
const cloudinary=require('./config/cloudinary')
const errorHandlerMiddleware=require('./middlewares/error')
const CORS=require('cors')

const app = express();

app.use(CORS({
    origin:'*'
}))
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));


app.use('/api/v1', require('./routes'))
app.use(errorHandlerMiddleware)
















app.listen(env.PORT, ()=>{
    console.log(`Server is listening on port - ${env.PORT}`)
})