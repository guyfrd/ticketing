import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { RequestValidationError } from '../errors/request-validation-error';


export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req);
        console.log("errors!!!", req.body.password);
        if (!errors.isEmpty()) {
            throw new RequestValidationError(errors.array());
        }
        next();
    } catch (err) {
        next(err);
    }
}