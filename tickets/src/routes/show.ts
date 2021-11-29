import express, { Request, Response, NextFunction } from 'express';
import {Ticket} from '../models/ticket';
import {NotFoundError, NotAuthorizedError} from '@gf-tickets/common'
const router = express.Router();

router.get('/api/tickets/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const ticket = await Ticket.findById(req.params.id);
        if (!ticket) {
            throw new NotFoundError();
        }
      
        res.send(ticket);
    }catch(err) {
        next(err);
    }
});


export { router as ShowTicketRouter }