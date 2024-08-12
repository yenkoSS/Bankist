const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const mongoose = require('mongoose');
const userRouter = require('./routers/userRouter');
const appRouter = require('./routers/appRouter');
const cookieParser = require('cookie-parser');
const cors = require('cors');
//config process environment

dotenv.config({ path: './config.env' });

// express app
const app = express();

// database connection
database = process.env.DATABASE;
mongoose
  .connect(database)
  .then(() => console.log('Connected to DB'))
  .catch((err) => console.log(`Error: ${err}`));

// M I D D L E W A R E S

// body parser
app.use(cookieParser());
app.use(cors({ origin: '*', credentials: true })); // credentials set to true means the server accepts cookies.
app.use(express.json());
app.use(express.static(__dirname + '/public'));

// loggin middleware
app.use(morgan('tiny'));
// routers
app.use('/', appRouter);
app.use('/api/v1/user', userRouter);

app.use((err, req, res, next) => {
  res
    .status(err.code || 500)
    .json({ code: err.code || 500, status: err.status, message: err.message });
});

const port = process.env.PORT || 9000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
