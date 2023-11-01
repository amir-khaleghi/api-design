import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// comparing the received password with hashed password
//return a promiss that is true or false
// ─── Compare Passwords ─────────────────────────────── 🟩 ─
export const comparePassword = (password, hash) => {
  return bcrypt.compare(password, hash);
};

// 5 is the salt that makes hashing more secure
// ─── Create Hash password ──────────────────────────── 🟩 ─
export const hashPassword = (password) => {
  return bcrypt.hash(password, 5);
};

// ─── Creating Jwt ─────────────────────────────────── 🟩 ─

export const createJWT = (user) => {
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET
  );
  //token now is a String
  return token;
};

/* ■■■■■■■■■■■■■■■■■■■■■ Middleware ■■■■■■■■■■■■■■■■■■■■■ */
export const protect = (req, res, next) => {
  const bearer = req.headers.authorization;
  if (!bearer) {
    res.status(401);
    res.json({ message: 'not authorized' });
    return;
  }

  // ─── Getting Token ────────────────────────────────── 🟩 ─

  const [, token] = bearer.split(' ');
  if (!token) {
    res.status(401);
    res.json({ message: 'not valid token structure' });
    return;
  }

  // ─── Validating Jwt Token ─────────────────────────── 🟩 ─

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next(); // go and do what you want to do
  } catch (e) {
    console.log(e);
    res.status(401);
    res.json({ message: 'not valid token' });
  }
};
