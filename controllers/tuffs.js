const Think = require('../model/Think.js');


exports.creatThinks = (req, res, next)=>{
    delete req.body._id;
    const thing = new Think({...req.body});
    thing.save()
    .then(() => res.status(201).json({message:'Object ajouté!'}))
    .catch(err=> res.status(400).json({err}));
}


exports.readOneThink = (req, res, next) => {
    Think.findOne({ _id: req.params.id })
      .then(thing => res.status(200).json(thing))
      .catch(error => res.status(404).json({ error }));
}


exports.updateOneThink =  (req, res, next) => {
    Think.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
}


exports.deleteOneThink = (req, res, next) => {
    Think.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
      .catch(error => res.status(400).json({ error }));
}

exports.readAllThink = (req, res, next) => {
    Think.find()
    .then( thinks =>{res.status(200).json(thinks)})
    .catch( err =>{res.status(400).json({err})});
}