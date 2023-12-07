const express = require('express');
const { getVente, postVente, deleteVente, putVente } = require('../controllers/venteControllers');

const router = express.Router()

router.get('/vente', getVente)
router.post('/vente',postVente)
router.put('/venteDelete/:id',deleteVente)
router.put('/vente/:id',putVente)

module.exports = router;