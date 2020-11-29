const User = require('../models/user.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const NotFoundError = require('../errors/not-found-err.js');

const getUsers = (req, res) => {
  User.find({})
    .then((data) => res.send(data));
};

const getUser = (req, res) => {
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
        return res.status(400).send({ message: 'Невалидный id' });
      }
      if (err.statusCode === 404) {
        return res.status(404).send({ message: 'Пользователя не существует' });
      }
      return res.send(err);
    });
};

const postUser = (req, res) => {
  const { name, about, avatar, email, password } = req.body;
  console.log(email)
  User.findOne({email})
    .then(user => {
      console.log(user)
      if (user) {
        return res.status(409).res.send(user)
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
          console.log(user)
          res.send({ data: user });
        })
    })
    // console.log('privet')
    // bcrypt.hash(req.body.password, 10)
    //   .then(hash => {
    //     User.create({
    //       name: req.body.name,
    //       about: req.body.about,
    //       avatar: req.body.avatar,
    //       email: req.body.email,
    //       password: hash,
    //     })
    //   })
    //   .then((user) => {
    //     console.log(user)
    //     res.send({ data: user });
    //   })
    .catch((err) => res.status(400).send(err));
};

const login = (req, res) => {
  const { email, password } = req.body;
  console.log(email)
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return res.status(401).send({ message: 'Неправильные почта или пароль' })
      }
      bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return res.status(401).send({ message: 'Неправильные почта или пароль' })
          }
          const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: 3600 });
          return res.send({ token });
        })
    })
    .catch(err => {
      res.status(401).send(err)
      console.log(err)
    })
}

const getUserMe = (req, res) => {
  const { _id } = req.user;
  User.findById(_id)
    .orFail(() => {
      throw new NotFound('Не найден');
    })
    .then((user) => res.send(user))
    .catch(err => res.send(err))
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