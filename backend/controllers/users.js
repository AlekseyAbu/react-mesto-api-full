const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');
const BadRequest = require('../erorrs/bad-request.js');
const NotFoundError = require('../erorrs/not-found-err.js');
const UnauthorizedError = require('../erorrs/unauthorized-error.js');
const ConflictingRequest = require('../erorrs/conflicting-request.js');
// const NotFoundError = require('../errors/not-found-err.js');

const getUsers = (req, res) => {
  User.find({})
    .then((data) => res.send(data));
};

const getUser = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail(() => {
      const err = new Error('Пользователь не найден');
      err.statusCode = 404;
      throw err;
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        next(new BadRequest('Невалидный id'));
      }
      if (err.statusCode === 404) {
        next(new NotFoundError('Пользователя не существует'));
      }
      next(err);
    });
};

const postUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ConflictingRequest('Пользователь существует');
      }

      return bcrypt.hash(req.body.password, 10);
    })
    .then((hash) => {
      User.create({
        name: req.body.name,
        about: req.body.about,
        avatar: req.body.avatar,
        email: req.body.email,
        password: hash,
      })
        .then((user) => {
          res.send(user.email);
        });
    })
    .catch((err) => {
      if (err.statusCode = 409) {
        next(new ConflictingRequest('Пользователь существует'));
      }
      next(new BadRequest('Ошибка регистрации'));
      next();
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Неправильные почта или пароль');
      }
      bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError('Неправильные почта или пароль');
          }
          const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: 3600 });
          return res.send({ token });
        });
    })
    .catch((err) => {
      // res.status(401).send(err)
      next(new UnauthorizedError(''));
      next(err);
    });
};

const getUserMe = (req, res, next) => {
  const { _id } = req.user;
  User.findById(_id)
    .orFail(() => {
      // eslint-disable-next-line no-undef
      throw new NotFoundError('Не найден');
    })
    .then((user) => res.send(user))
    .catch(next);
};

module.exports = {
  getUser,
  getUsers,
  postUser,
  login,
  getUserMe,
};
