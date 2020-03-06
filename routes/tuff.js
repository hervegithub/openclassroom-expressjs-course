const express = require('express');
const router = express.Router();
const thinkCtrl = require('../controllers/tuffs.js');

/* Post data on mongodb */
router.post('/',thinkCtrl.creatThinks);

/* Get on spécifique data */
router.get('/:id', thinkCtrl.readOneThink);

/** Mettre à jour une data dans la base de donnée */
router.put('/:id',thinkCtrl.updateOneThink);

/**  Suprimer une data dans la base de donnée*/
router.delete('/:id', thinkCtrl.deleteOneThink);


/* Get all data on mongodb */
router.get('/', thinkCtrl.readAllThink);

module.exports = router;