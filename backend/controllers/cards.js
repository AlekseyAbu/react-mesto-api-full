const Card = require('../models/card.js');
const NotFoundError = require('../erorrs/not-found-err.js');
const Forbidden = require('../erorrs/forbidden.js');

const getCards = (req, res) => {
  Card.find({})
    .populate('user')
    .then((data) => res.send(data));
};

const postCard = (req, res, next) => {
  const { name, link } = req.body;
  const { _id } = req.user;
  Card.create({ name, link, owner: _id })
    .then((card) => res.send({ data: card }))
    .catch(next);
};

const deletCard = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;
  Card.findById(cardId)
    .orFail(() => {
      const err = new Error('Карточка не найдена');
      err.statusCode = 404;
      throw err;
    })
    .then((card) => {
      if (card.owner._id.toString() === userId) {
        Card.findByIdAndRemove({ _id: cardId })
          // eslint-disable-next-line no-shadow
          .then((card) => res.status(200).send(card));
      } else {
        throw new Forbidden('Нельзя удалить чужую карточку');
      }
    })
    .catch((err) => {
      if (err.statusCode === 404) {
        next(new NotFoundError(''));
      }
      const error = new Error('Ошбика');
      next(error);
    });
};

module.exports = {
  getCards,
  postCard,
  deletCard,
};
