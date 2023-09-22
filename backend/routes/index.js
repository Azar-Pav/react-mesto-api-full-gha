const router = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');
const {
  createUser,
  login,
} = require('../controllers/users');

const auth = require('../middlewares/auth');
const {
  checkLogin,
  checkCreateUser,
} = require('../middlewares/requestValidators');

const NotFoundError = require('../errors/NotFoundError');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.post('/signin', checkLogin, login);
router.post('/signup', checkCreateUser, createUser);
router.use(auth);
router.use('/users', userRouter);
router.use('/cards', cardRouter);
router.use('*', (req, res, next) => {
  next(new NotFoundError('Неправильный путь'));
});

module.exports = router;
