const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { cryptHash } = require('../utils/errors');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(new Error('notValidId'))
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.getLoggedUser = (req, res, next) => {
  User.findById(req.user)
    .orFail(new Error('notValidId'))
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(new Error('notValidId'))
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(new Error('notValidId'))
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  User.init()
    .then(() => {
      cryptHash(password)
        .then((hash) => User.create({
          name, about, avatar, email, password: hash,
        }))
        .then((user) => res.status(201).send(user))
        .catch(next);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        sameSite: 'none',
        secure: true,
        httpOnly: true,
      });
      res.send({ jwt: token });
    })
    .catch(next);
};

module.exports.logout = (req, res, next) => {
  try {
    res.clearCookie('jwt', {
      sameSite: 'none',
      secure: true,
      httpOnly: true,
    });
    res.send({ message: 'Logout Successful' });
  } catch (err) {
    next(err);
  }
};

// TODO Обьеденить с auth?
module.exports.checkCookies = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) throw new Error('JsonWebTokenError');
  try {
    jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
    res.send({ jwt: token });
  } catch (err) {
    next(err);
  }
};
