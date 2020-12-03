const NotFoundError = require('../erorrs/not-found-err.js') //404

const getError = (req, res, next) => {
  throw new NotFoundError('Запрашиваемый ресурс не найден')
  .catch(next)
};

module.exports = getError;
