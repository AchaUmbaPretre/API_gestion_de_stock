const express = require('express');
const { getVente, postVente, deleteVente, putVente, getRetour, postRetour, deleteRetour, putRetour } = require('../controllers/venteControllers');

const router = express.Router()

router.get('/', getVente)
router.post('/vente',postVente)
router.put('/venteDelete/:id',deleteVente)
router.put('/vente/:id',putVente)

router.get('/retour',getRetour)
router.post('/retour',postRetour)
router.put('/retourDelete/:id',deleteRetour)
router.put('/retour/:id',putRetour)

module.exports = router;