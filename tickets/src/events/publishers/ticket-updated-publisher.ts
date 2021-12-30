 import { Publisher, Subjects , TicketUpdatedEvent } from '@gf-tickets/common';

 export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
 }