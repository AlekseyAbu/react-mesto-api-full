const Card = require('../models/card.js');

const getCards = (req, res) => {
  Card.find({})
    .populate('user')
    .then((data) => res.send(data));
};

const postCard = (req, res) => {
  const { name, link } = req.body;
  const { _id } = req.user;
  Card.create({ name, link, owner: _id })
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(400).send(err));
};

const deletCard = (req, res) => {
  const { cardId } = req.params;
  const  userId  = req.user._id;
  // console.log(cardId)
  Card.findById(cardId)
    .orFail(() => {
      const err = new Error('Карточка не найдена');
      err.statusCode = 404;
      throw err;
    })
    .then((card) => {
      console.log(card.owner._id.toString())
      console.log(userId)
      if (card.owner._id.toString() === userId) {
        Card.findByIdAndRemove({ _id: cardId })
          .then(card => res.status(200).send(card))
      }
      else {
        res.status(400).send({message: 'Нельзя удалить чужую карточку'})
      }
    })
    .catch((err) => {
      if (err.statusCode === 404) {
        next(err)

      }
      const error = new Error('Ошбика')
      next(error)
    });
};

module.exports = {
  getCards,
  postCard,
  deletCard,
};


