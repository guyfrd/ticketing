import express, { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import {
  validateRequest,
  NotFoundError,
  requireAuth,
  NotAuthorizedError,
} from '@gf-tickets/common';
import { Ticket } from '../models/ticket';

const router = express.Router();

router.put(
  '/api/tickets/:id',
  [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('price')
      .isFloat({ gt: 0 })
      .withMessage('Price must be greater than 0'),
  ],
  validateRequest,
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
        const ticket = await Ticket.findById(req.params.id);
        if (!ticket) {
            throw new NotFoundError();
        }
        
        if (ticket.userId !== req.currentUser?.id) {
            throw new NotAuthorizedError();
        }
        ticket.set({
            title: req.body.title,
            price: req.body.price
        });
        ticket.save();
        // const newTicket = await Ticket.findOneAndUpdate({_id: req.params.id}, req.body)
        
        res.send(200);

    } catch(err) {
        next(err);
    }
});

export { router as updateTicketRouter };