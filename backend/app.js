const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('cors');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');
const NotFoundError = require('./errors/NotFound');
const { validateCreateUser, validateLoginUser } = require('./middlewares/validation');

const {
  PORT = 3000,
  MONGO_URL = 'mongodb://127.0.0.1:27017/mestodb',
} = process.env;

mongoose.connect(`${MONGO_URL}`, {
  useNewUrlParser: true,
});
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signup', validateCreateUser, createUser);
app.post('/signin', validateLoginUser, login);

app.use(auth);
app.use(userRouter);
app.use(cardRouter);

app.use((req, res, next) => next(new NotFoundError('Страницы по такому URL не найдено')));
app.use(errors());
app.use(errorHandler);

app.listen(PORT);
