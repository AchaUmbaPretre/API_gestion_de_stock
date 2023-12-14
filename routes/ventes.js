const express = require('express');
const { getVente, postVente, deleteVente, putVente, getRetour, postRetour, deleteRetour, putRetour, getEchange, postEchange, deleteEchange, putEchange, getVenteTotalPrix, getVenteOne } = require('../controllers/venteControllers');

const router = express.Router()

router.get('/', getVente)
router.get('/venteTotal', getVenteTotalPrix)
router.get('/venteOne/:id',getVenteOne)
router.post('/vente',postVente)
router.put('/venteDelete/:id',deleteVente)
router.put('/vente/:id',putVente)

router.get('/retour',getRetour)
router.post('/retour',postRetour)
router.put('/retourDelete/:id',deleteRetour)
router.put('/retour/:id',putRetour)

router.get('/echange',getEchange)
router.post('/echange',postEchange)
router.put('/echangeDelete/:id',deleteEchange)
router.put('/echange/:id',putEchange)

module.exports = router;