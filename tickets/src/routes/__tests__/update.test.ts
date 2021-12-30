import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import * as authHelper from '../../test/auth-helper';
import { natsWrapper } from '../../nats-wrapper';

it('returns a 404 if the provided id does not exist', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .set('Cookie', await authHelper.signIn())
    .send({
      title: 'aslkdfj',
      price: 20,
    })
    .expect(404);
});

it('returns a 401 if the user is not authenticated', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .send({
      title: 'aslkdfj',
      price: 20,
    })
    .expect(401);
});

it('returns a 401 if the user does not own the ticket', async () => {
    const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', await authHelper.signIn())
    .send({
        title:'asda',
        price:20
    });

    await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', await authHelper.signIn())
    .send({

        title:'safasv',
        price:10
    })
    .expect(401)
});

it('returns a 400 if the user provides an invalid title or price', async () => {
    const cookie = await authHelper.signIn();
    const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
        title:'asda',
        price:20
    });

    await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
        title: '',
        price:20
    })        
    .expect(400);

});

it('updates the ticket provided valid inputs', async () => {
    const cookie = await authHelper.signIn();
    const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
        title:'asda',
        price:20
    });

    const newTicket = {title:'new title', price:111};
    await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send(newTicket);

    const ticket = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send({});

    expect(ticket.body.title).toEqual(newTicket.title);
    expect(ticket.body.price).toEqual(newTicket.price);

});

it('publishes an event', async () => {
    const cookie = await authHelper.signIn();
  
    const response = await request(app)
      .post('/api/tickets')
      .set('Cookie', cookie)
      .send({
        title: 'asldkfj',
        price: 20,
      });
  
    await request(app)
      .put(`/api/tickets/${response.body.id}`)
      .set('Cookie', cookie)
      .send({
        title: 'new title',
        price: 100,
      })
      .expect(200);
  
    expect(natsWrapper.client.publish).toHaveBeenCalled();
  });