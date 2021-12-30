import mongoose from 'mongoose';
import { app } from './app';
import { natsWrapper } from './nats-wrapper';

const start = async () => {
    if (!process.env.JWT_KEY){
        throw new Error('JWT_KEY must defined');
    }
    if (!process.env.MONGO_URI) {
        throw new Error('Mongo URI must be defined');
    }

    
    try {
        await natsWrapper.connect('ticketing', 'dfsa', 'http://nats-srv:4222');

        natsWrapper.client.on('close', () => {
            console.log('NATS closed');
            process.exit();
        });
        process.on('SIGINT', () => natsWrapper.client.close());
        process.on('SIGTERM', () => natsWrapper.client.close());
        
        await mongoose.connect(process.env.MONGO_URI);
    } catch(err) { 
        console.log(err);
    }
    console.log('connected to mongo');

    app.listen(10000, () => {
        console.log("tickets listening on port 10000");
    })
}

start();