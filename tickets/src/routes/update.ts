import express, { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import {
  validateRequest,
  NotFoundError,
  requireAuth,
  NotAuthorizedError,
} from '@gf-tickets/common';
import { Ticket } from '../models/ticket';
import { TicketUpdatedPublisher } from '../events/publishers/ticket-updated-publisher';
import { natsWrapper } from '../nats-wrapper';

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
        await ticket.save();
        new TicketUpdatedPublisher(natsWrapper.client).publish({
          id: ticket.id,
          title: ticket.title,
          price: ticket.price,
          userId: ticket.userId,
          version: ticket.version
        });

        res.send(200);

    } catch(err) {
        next(err);
    }
});

export { router as updateTicketRouter };