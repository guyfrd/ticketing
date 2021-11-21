import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {
    if (!process.env.JWT_KEY){
        throw new Error('JWT_KEY must defined');
    }

    try {
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
    } catch(err) { 
        console.log(err);
    }
    console.log('connected to mongo');
    app.listen(10000, () => {
        console.log("auth listening on port 10000!!!pp!");
    })
}

start();