const express = require('express');
const formidable = require('express-formidable');
const cors = require('cors');
const ExpressFormidable = require('express-formidable');
require('dotenv').config();

const app = express();
app.use(ExpressFormidable());
app.use(cors());

const charactersRoute = require('./routes/characters');
app.use(charactersRoute);
const comicsRoute = require('./routes/comics');
app.use(comicsRoute);

app.all('*', (req, res) => {
  res.status(404).json({
    message: 'Route not found',
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Masserver Started on port ${process.env.PORT} !`);
});
