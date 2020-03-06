const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const routerStuff = require('./routes/tuff');


mongoose.connect('mongodb+srv://codehero:swizz20GANG@cluster0-lgqyb.mongodb.net/test?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyparser.json())

app.use('/api/stuff',routerStuff);

module.exports = app;