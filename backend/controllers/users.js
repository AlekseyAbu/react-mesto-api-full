const User = require('../models/user.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const BadRequest = require('../erorrs/bad-request.js'); //400
const NotFoundError = require('../erorrs/not-found-err.js') //404
const UnauthorizedError = require('../erorrs/unauthorized-error.js') //401
const ConflictingRequest = require('../erorrs/conflicting-request.js') //409
// const NotFoundError = require('../errors/not-found-err.js');

const getUsers = (req, res) => {
  User.find({})
    .then((data) => res.send(data));
};

const getUser = (req, res, next) => {
  const { userId } = req.params;
  console.log(userId)
  User.findById(userId)
    .orFail(() => {
      const err = new Error('Пользователь не найден');
      err.statusCode = 404;
      throw err;
    })
    .then((user) => {
      // if(!user) {
      //   throw new NotFoundError('Нет пользователя с таким id');
      // }
      res.send(user);
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        // return res.status(400).send({ message: 'Невалидный id' });
        next(new BadRequest('Невалидный id'));
      }
      if (err.statusCode === 404) {
        // return res.status(404).send({ message: 'Пользователя не существует' });
        next(new NotFoundError('Пользователя не существует'));
      }
      next(err)
    });
};

const postUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;
  console.log(email)
  User.findOne({ email })
    .then(user => {
      console.log(user, 'hey')
      if (user) {
        // return res.status(409).res.send(user)
        throw new ConflictingRequest('Пользователь существует');
      }

      return bcrypt.hash(req.body.password, 10)
    })
    .then(hash => {
      User.create({
        name: req.body.name,
        about: req.body.about,
        avatar: req.body.avatar,
        email: req.body.email,
        password: hash,
      })
        .then((user) => {
          res.send(user.email);
        })
    })
    .catch(err => {
      console.log(err)
      if(err.statusCode = 409){
        next(new ConflictingRequest('Пользователь существует'))
      }
      next(new BadRequest('Ошибка регистрации'))
      next()
    })
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  console.log(email)
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        // return res.status(401).send({ message: 'Неправильные почта или пароль' })
        throw new UnauthorizedError('Неправильные почта или пароль')
      }
      bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            // return res.status(401).send({ message: 'Неправильные почта или пароль' })
            throw new UnauthorizedError('Неправильные почта или пароль')
          }
          const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: 3600 });
          return res.send({ token });
        })
    })
    .catch(err => {
      // res.status(401).send(err)
      next(new UnauthorizedError(''))
      next(err)
    })
}

const getUserMe = (req, res, next) => {
  const { _id } = req.user;
  User.findById(_id)
    .orFail(() => {
      throw new NotFound('Не найден');
    })
    .then((user) => res.send(user))
    .catch(next)
}



module.exports = {
  getUser,
  getUsers,
  postUser,
  login,
  getUserMe,
};



// "avatar": "https://wikiway.com/upload/hl-photo/d40/697/detroyt_7.jpg",
// "about": "stas from london",
// "name": "stas"

// {"email":"aaa@jbd.ru",
// "password":"yacsdfdfdg"
// }