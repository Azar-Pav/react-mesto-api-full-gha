const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { isEmail, isURL } = require('validator');

const UnauthorizedError = require('../errors/UnauthorizedError');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
      minlength: [2, 'Минимальная длина поля name - 2'],
      maxlength: [30, 'Максимальная длина поля name - 30'],
      default: 'Жак-Ив Кусто',
    },
    about: {
      type: String,
      required: false,
      minlength: [2, 'Минимальная длина поля about - 2'],
      maxlength: [30, 'Максимальная длина поля about"- 30'],
      default: 'Исследователь',
    },
    avatar: {
      type: String,
      required: false,
      default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      validate: {
        validator: (v) => isURL(v),
        message: 'Неправильный формат ссылки',
      },
    },
    email: {
      type: String,
      required: [true, 'Поле email должно быть заполнено'],
      unique: true,
      validate: {
        validator: (v) => isEmail(v),
        message: 'Неправильный формат почты',
      },
    },
    password: {
      type: String,
      required: [true, 'Поле password должно быть заполнено'],
      select: false,
    },
  },
  { versionKey: false },
);

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError('Неправильные почта или пароль'));
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
