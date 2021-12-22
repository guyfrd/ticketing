import nats from 'node-nats-streaming';
// import { TickerCreatedEvent } from './events/ticket-creared';
import { TickerCreatedPublisher } from './events/ticket-created-publisher';
console.clear();

const stan = nats.connect('ticketing', 'abc', {
    url: 'http://localhost:4222'
});

stan.on('connect',async () => {
    console.log('Publisher connected to NATS');
    const publisher = new TickerCreatedPublisher(stan);
    await publisher.publish({
      id: '123',
      title: 'concert',
      price: 20,
    });
  });