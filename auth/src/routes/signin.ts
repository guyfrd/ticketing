import express, { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import { BadRequestError } from '../errors/bad-request-error'
import { RequestValidationError } from '../errors/request-validation-error';
import { User } from '../models/user';
import { Password } from '../services/passwords';
import { validateRequest } from '../middlewares/validate-request';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/api/users/signin', 
[
    body('email').isEmail().withMessage("email most be valid"),
    body('password').trim().notEmpty().withMessage("You must supply password")
],  validateRequest, 
async (req: Request, res: Response, next: NextFunction) => {
    //valdiate that the email and password valid

    //check if the user exist. if not throw error

    // the user exist and the password match, ta
    try {
       
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (!existingUser) { 
             throw new BadRequestError('not found user');
        }
        const matchPassword = await Password.compare(existingUser.password, password);
        if (!matchPassword) {
            throw new BadRequestError("wrong password");
        }

        const userJwt = jwt.sign({
            id: existingUser.id,
            email: existingUser.email
        }, 
            process.env.JWT_KEY!
        ); 

        req.session = {
            jwt: userJwt
        };

        res.status(201).send(existingUser);
    } catch(err) {
        next(err);
    }
});

export { router as signinRouter } 