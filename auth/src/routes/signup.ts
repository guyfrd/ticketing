import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

const router = express.Router();

router.post('/api/users/signup',
[
    body('email').isEmail().withMessage("email most be valid"),
    body('password').trim().isLength({min: 4, max: 20}).withMessage("Passwords must be between 4 and 20 char")
], 
(req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new Error('Invalid email or password');
    }

    const { email, passwords } = req.body;
    throw new Error('error connect DB');

    res.send({status: "200"});
});
  
export { router as signupRouter } 