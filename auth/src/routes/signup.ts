import express, { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import { DatabaseConnectionError } from '../errors/database-connection-error';
import { RequestValidationError } from '../errors/request-validation-error';

const router = express.Router();

router.post('/api/users/signup',
[
    body('email').isEmail().withMessage("email most be valid"),
    body('password').trim().isLength({min: 4, max: 20}).withMessage("Passwords must be between 4 and 20 char")
], 
async (req: Request, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new RequestValidationError(errors.array());
        }

        const { email, passwords } = req.body;
        throw new DatabaseConnectionError();
        res.send({status: "200"});  
    } catch(err) {
        next(err);
    }
});


        
export { router as signupRouter } 