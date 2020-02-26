const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const Think = require('./model/Think.js');

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

/* Post data on mongodb */
app.post('/api/stuff',(req, res, next)=>{
    delete req.body._id;

    const thing = new Think({...req.body});

    thing.save()
    .then(() => res.status(201).json({message:'Object ajouté!'}))
    .catch(err=> res.status(400).json({err}));
})

/* Get on spécifique data */

app.get('/api/stuff/:id', (req, res, next) => {
    Think.findOne({ _id: req.params.id })
      .then(thing => res.status(200).json(thing))
      .catch(error => res.status(404).json({ error }));
  });

/** Mettre à jour une data dans la base de donnée */

app.put('/api/stuff/:id', (req, res, next) => {
    Think.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
});

/**  Suprimer une data dans la base de donnée*/
app.delete('/api/stuff/:id', (req, res, next) => {
    Think.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
      .catch(error => res.status(400).json({ error }));
  });


/* Get all data on mongodb */

app.get('/api/stuff', (req, res, next) => {
    Think.find()
    .then( thinks =>{res.status(200).json(thinks)})
    .catch( err =>{res.status(400).json({err})});
});



module.exports = app;