import request from 'supertest';
import { app } from '../../app'

it('has route handler listen to api/tickets from post requests', async () => {
    const response = await request(app)
    .post('/api/tickets')
    .send({});
    console.log(response.status);
    expect(response.status).not.toEqual(404);
});

it('can only be access if the user is signed in', async () => {

});

it('return an error if invalid title is provide', async () => {

});

it('return an error if invalid price is provide', async () => {

});

it('create a tickets with valid inputs', async () => {

});