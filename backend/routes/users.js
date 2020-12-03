const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUser,
  getUsers,
  getUserMe,
} = require('../controllers/users.js');

router.get('/users/me', getUserMe);
router.get('/users', getUsers);
router.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24),
  }),
}),
getUser);

module.exports = router;
