import request from 'supertest';
import { app } from '../../app';
import { response } from 'express';

jest.setTimeout(30000)

it('returns a 201 on successful signup', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(201);
});

it('return 400 whith invalid email', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test',
      password: 'password'
    })
    .expect(400);
});

it('return 400 whith invalid email and password', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test',
      password: 'ps'
    })
    .expect(400);
});

it('return 400 whith invalid password', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@ff.com',
      password: 'ps'
    })
    .expect(400);
});

it('try signup with exist email', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(201);

    await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(400);

});

it('set acookie after successful signup', async () => {
  const res = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(201);

    expect(res.get('Set-Cookie')).toBeDefined();
  

})