import prisma from '../db';
import { comparePassword, createJWT, hashPassword } from '../modules/auth';

// ─── Create New User ──────────────────────────────── 🟩 ─
export const createNewUser = async (req, res, next) => {
  try {
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: await hashPassword(req.body.password),
      },
    });

    const token = createJWT(user);
    res.json({ token }); //{ token: token }
  } catch (e) {
    e.type = 'input';
    next(e);
  }
};

// ─── Sign In ──────────────────────────────────────── 🟩 ─
//we need username and password
export const signin = async (req, res) => {
  const user = await prisma.user.findUnique({
    //first step : find the user by username
    where: {
      username: req.body.username,
    },
  });
  //looking that user hash password and match with what you passed me in plain text
  const isValid = await comparePassword(req.body.password, user.password);

  if (!isValid) {
    res.status(401);
    res.json({ message: 'nope' });
    return;
  }
  const token = createJWT(user);
  res.json({ token }); //{ token: token }
};
