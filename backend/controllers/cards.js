const Card = require('../models/card.js');
const BadRequest = require('../erorrs/bad-request.js'); //400
const NotFoundError = require('../erorrs/not-found-err.js') //404
const Forbidden = require('../erorrs/forbidden.js')  //403

const getCards = (req, res) => {
  Card.find({})
    .populate('user')
    .then((data) => res.send(data));
};

const postCard = (req, res, next) => {
  const { name, link } = req.body;
  const { _id } = req.user;
  console.log(req.body)
  console.log(req.user)
  Card.create({ name, link, owner: _id })
    .then((card) => res.send({ data: card }))
    .catch(next);
    //(err) => res.status(400).send(err)
};

const deletCard = (req, res, next) => {
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
        throw new Forbidden('Нельзя удалить чужую карточку')
        //res.status(400).send({message: 'Нельзя удалить чужую карточку'})
      }
    })
    .catch((err) => {
      if (err.statusCode === 404) {
        next(new NotFoundError(''))

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


