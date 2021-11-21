import express, { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { DatabaseConnectionError } from '@gf-tickets/common';
import { BadRequestError } from '@gf-tickets/common';
import { RequestValidationError } from '@gf-tickets/common';
import { User } from '../models/user';
import { validateRequest } from '@gf-tickets/common';

const router = express.Router();

router.post('/api/users/signup',
[
    body('email').isEmail().withMessage("email most be valid"),
    body('password').trim().isLength({min: 4, max: 20}).withMessage("Passwords must be between 4 and 20 char"),
],  validateRequest,
async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) { 
             throw new BadRequestError('Email in use');
        }

        const user = User.build({ email, password});
        await user.save();
   
        const userJwt = jwt.sign({
                id: user.id,
                email: user.email
            }, 
            process.env.JWT_KEY!
        ); 

        req.session = {
            jwt: userJwt
        };

        res.status(201).send(user);
    } catch(err) {
        next(err);
    }
});


        
export { router as signupRouter } 