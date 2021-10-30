const jwt = require('jsonwebtoken');
const NotAuthError = require('../errors/not-found');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  const { JWT_SECRET = 'super-strong-secret' } = process.env;

  if (!token) {
    throw new NotAuthError('Проблемы с аутентификацией');
  }

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    throw new NotAuthError('Проблемы с аутентификацией');
  }
};
