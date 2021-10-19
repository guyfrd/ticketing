import express from 'express';
import mongoose from 'mongoose';
import { json } from 'body-parser';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler } from './middlewares/error-handlers'
import { NotFoundError } from './errors/not-found-error';

const app = express();  

app.use(json());
app.use(currentUserRouter);
app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);

app.all('*', async (req, res, next) => {
   next(new NotFoundError());
})
app.use(errorHandler);

const start = async () => {
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