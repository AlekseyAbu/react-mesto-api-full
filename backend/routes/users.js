const router = require('express').Router();

const {
  getUser,
  getUsers,
  getUserMe
} = require('../controllers/users.js');

router.get('/users/me', getUserMe)
router.get('/users', getUsers);
router.get('/users/:userId', getUser);

module.exports = router;

