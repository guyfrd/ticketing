import express from 'express';
import mongoose from 'mongoose';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError } from '@gf-tickets/common';
import { createTicketRouter } from './routes/new';

const app = express();  

app.use(json());
app.set('trust proxy', true);
app.use(
    cookieSession({
        signed: false,
        secure: process.env.NODE_ENV !== 'test'
    })
)
app.use(createTicketRouter);
app.all('*', async (req, res, next) => {
   next(new NotFoundError());
})
app.use(errorHandler);

export { app };