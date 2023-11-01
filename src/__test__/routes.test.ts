// import app from '../server';
// import router from '../router';
// import supertest from 'supertest';
// ─────────────────────────────────────────────────────────

// describe('GET /', () => {
//   it('should send back some data', async () => {
//     const res = await supertest(app).get('/');

//     expect(res.body.message).toBe('hello');
//   });
// });

// ──────────────────────────────────────────────────── 🟩 ─

import * as user from '../handlers/user';

describe('user handler', () => {
  it('should create a new user', async () => {
    const req = { body: { username: 'hello', password: 'hi' } };
    const res = {
      json({ token }) {
        console.log(token);
        expect(token).toBeTruthy();
      },
    };
    await user.createNewUser(req, res, () => {});
  });
});
