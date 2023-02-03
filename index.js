const express = require('express');
const app = express();
require('dotenv').config()

const connectDB = require('./database/connect');

const userRegister = require('./route/User');
const userLogin = require('./route/Login');
const userLogout = require('./route/Logout');
const products = require('./route/Product');
const productsPost = require('./route/Products');
const cookieParser = require('cookie-parser');
const cors = require('cors')

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());
app.use(cors());


app.use('/api/v1', userRegister);
app.use('/api/v1', userLogin);
app.use('/api/v1', userLogout);
app.use('/api/v1', products);
app.use('/api/v1', productsPost);


const start = async() => {

    try {

        await connectDB(process.env.MONGO_URI)
        app.listen(process.env.PORT, ()=> console.log(`the server is running on ${process.env.PORT}....`))
        
    } catch (error) {
        console.log(error);
    }
}

start();



