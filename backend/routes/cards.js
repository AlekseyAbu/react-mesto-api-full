const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getCards,
  postCard,
  deletCard,
} = require('../controllers/cards.js');


router.get('/cards', getCards);
router.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().min(2),
  }),
}),
postCard);
router.delete('/cards/:cardId', deletCard);

module.exports = router;
