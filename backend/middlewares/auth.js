const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) return new Error('notValidId');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    return new Error('notValidId');
  }

  req.user = payload;

  next();
};
