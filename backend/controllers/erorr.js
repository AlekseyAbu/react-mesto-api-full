const NotFoundError = require('../erorrs/not-found-err.js');

const getError = (req, res, next) => {
  throw new NotFoundError('Запрашиваемый ресурс не найден')
    .catch(next);
};

module.exports = getError;
