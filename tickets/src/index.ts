import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {
    if (!process.env.JWT_KEY){
        throw new Error('JWT_KEY must defined');
    }
    if (!process.env.MONGO_URI) {
        throw new Error('Mongo URI must be defined');
    }

    try {
        await mongoose.connect(process.env.MONGO_URI);
    } catch(err) { 
        console.log(err);
    }
    console.log('connected to mongo');
    app.listen(10000, () => {
        console.log("auth listening on port 10000!!!pp!");
    })
}

start();