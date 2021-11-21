import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
    id: string,
    email: string, 
};

declare global {
    namespace Express {
        interface Request{
            currentUser?: UserPayload;
        }
    }
}
export const currentUser = (req: Request, res: Response, next: NextFunction) => {
    //check if jwt session exist 
    if (!req.session?.jwt) {
        return next();
    }
    //check if jwt valid
    try {
        const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserPayload;
        req.currentUser = payload;
    }catch (err) {}
    next();
}