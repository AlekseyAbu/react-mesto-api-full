const fsPromises = require('fs').promises;

module.exports = (pathUrl) => fsPromises.readFile(pathUrl, { encoding: 'utf8' })
  .then((file) => JSON.parse(file))
  // eslint-disable-next-line no-undef
  .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
