const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user');
const BadRequestError = require('../errors/BadRequest');
const ConflictError = require('../errors/Conflict');
const UnauthorizedError = require('../errors/Unauthorized');
const NotFoundError = require('../errors/NotFound');

const { NODE_ENV, JWT_SECRET } = process.env;

const SALT_ROUNDS = 10;

function createUser(req, res, next) {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  if (!email || !password) {
    return next(new BadRequestError('Email и пароль обязательные для регистрации'));
  }

  return bcrypt.hash(password, SALT_ROUNDS)
    .then((hash) => userModel.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => res.status(201).send({
      _id: user._id,
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      email: user.email,
    }))
    .catch((err) => {
      if (err.name === 'MongoServerError' && err.code === 11000) {
        return next(new ConflictError('При регистрации указан email, который уже существует на сервере'));
      }
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Переданы некорректные данные при регистрации пользователя'));
      }
      return next(err);
    });
}

function login(req, res, next) {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new BadRequestError('Email и пароль обязательные для авторизации'));
  }
  return userModel.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        return next(new UnauthorizedError('Неправильный email или пароль'));
      }
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      return res.status(200).send({ token });
    })
    .catch((err) => next(err));
}

function getUsersInfo(req, res, next) {
  return userModel
    .find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => next(err));
}

function getUserInfo(req, res, next) {
  return userModel
    .findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return next(new NotFoundError('Пользователь по указанному _id не найден'));
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Передан некорректный _id пользователя'));
      }
      return next(err);
    });
}

function getCurrentUserInfo(req, res, next) {
  return userModel
    .findById(req.user._id)
    .then((user) => {
      if (!user) {
        return next(new NotFoundError('Пользователь по указанному _id не найден'));
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Передан некорректный _id пользователя'));
      }
      return next(err);
    });
}

function updateUserProfile(req, res, next) {
  const { name, about } = req.body;
  const userId = req.user._id;
  return userModel
    .findByIdAndUpdate(
      userId,
      { name, about },
      { new: true, runValidators: true },
    )
    .then((user) => {
      if (!user) {
        return next(new NotFoundError('Пользователь по указанному _id не найден'));
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        return next(new BadRequestError('Передан некорректный _id пользователя'));
      }
      return next(err);
    });
}

function updateUserAvatar(req, res, next) {
  const { avatar } = req.body;
  const userId = req.user._id;
  return userModel
    .findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return next(new NotFoundError('Пользователь по указанному _id не найден'));
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        return next(new NotFoundError('Переданы некорректные данные при обновлении аватара'));
      }
      return next(err);
    });
}

module.exports = {
  getUsersInfo,
  createUser,
  getUserInfo,
  getCurrentUserInfo,
  updateUserProfile,
  updateUserAvatar,
  login,
};
