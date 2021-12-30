 import { Publisher, Subjects , TicketCreatedEvent } from '@gf-tickets/common';

 export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
    
 }