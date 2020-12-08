const bcrypt = require('bcryptjs');

const ERROR_CODE_400 = 400;
const ERROR_CODE_401 = 401;
const ERROR_CODE_404 = 404;
const ERROR_CODE_500 = 500;

const errorMessage400 = 'Переданы некорректные данные';
const errorMessage401 = 'Неправильные почта или пароль';
const errorMessage404 = 'Запрашиваемый ресурс не найден';
const errorMessage500 = 'На сервере произошла ошибка';

const checkError = (err, res) => {
  if (err.name === 'CastError' || err.name === 'ValidationError' || err.name === 'MongoError') {
    res.status(ERROR_CODE_400).send({ message: errorMessage400, details: err.message });
  } else if (err.message === 'notValidLogin') {
    res.status(ERROR_CODE_401).send({ message: errorMessage401 });
  } else if (err.message === 'notValidId') {
    res.status(ERROR_CODE_404).send({ message: errorMessage404 });
  } else {
    res.status(ERROR_CODE_500).send({ message: errorMessage500, details: err.message });
  }
};

function cryptHash(password) {
  if (!password) {
    return Promise.reject(new Error('notValidLogin'));
  }

  return bcrypt.hash(password, 10);
}

const cryptCompare = (password, hashedPassword) => {
  if (!password || !hashedPassword) {
    return Promise.reject(new Error('notValidLogin'));
  }

  return bcrypt.compare(password, hashedPassword);
};

module.exports = {
  ERROR_CODE_404, errorMessage404, checkError, cryptCompare, cryptHash,
};
