import express from 'express';
import router from './router';
import morgan from 'morgan';
import cors from 'cors';
import { protect } from './modules/auth';
import { createNewUser, signin } from './handlers/user';
// ──────────────────────────────────────────────────── 🟩 ─

const app = express(); // make API

/* ■■■■■■■■■■■■■■■■■■■■■ Middleware ■■■■■■■■■■■■■■■■■■■■■ */
/* Built in ______________________________________________ */
//global for whole app
app.use(cors());
//cross origin research share
app.use(morgan('dev'));
// log everything that i need as developer
app.use(express.json());
// allows the client to send JSON
app.use(express.urlencoded({ extended: true }));
// exp: 'google.com?a=1,thing=otherthing' convert this to json

/* Custom Middleware ____________________________________ */
// const customMiddleware = (message) => (req, res, next) => {
//   console.log(`Hello from ${message}`);
//   next();
// };

/* ■■■■■■■■■■■■■■■■■■■■■■■■■ Get ■■■■■■■■■■■■■■■■■■■■■■■■ */
app.get('/', (req, res, next) => {
  res.json({ message: 'hello' });
}); // => I want to respond to a get request with route '/'

/* ■■■■■■■■■■■■■■■■■■■■■■■■■ Use ■■■■■■■■■■■■■■■■■■■■■■■■ */
//protect middleware protect from all routes in the user api
app.use('/api', protect, router);
// this means that /api is coming before any routes  => url/api/routes (router is like a component)

/* ■■■■■■■■■■■■■■■■■■■■■■■■ Post ■■■■■■■■■■■■■■■■■■■■■■■■ */

app.post('/user', createNewUser);
app.post('/signin', signin);

// ─── Handle Error ─────────────────────────────────── 🟩 ─

app.use((err, req, res, next) => {
  if (err.type === 'auth') {
    res.status(401).json({ message: 'unauthorized' });
  } else if (err.type === 'input') {
    res.status(400).json({ message: 'invalid input' });
  } else {
    res.status(500).json({ message: 'oops, thats on us ' });
  }
});
/* ■■■■■■■■■■■■■■■■■■■■■■■ Export ■■■■■■■■■■■■■■■■■■■■■■■ */
export default app;
