const express = require('express')
const { getClient, postClient, putClient, deleteClient } = require('../controllers/peupleControllers')

const router = express.Router()

router.get('/client', getClient)
router.post('/client', postClient)
router.delete('/client', deleteClient)
router.put('/client', putClient)

router.get('/livreur', getProduit)
router.post('/livreur', postProduit)
router.put('/livreur', deleteProduit)

router.get('/utilisateur', getProduit)
router.post('/utilisateur', postProduit)
router.put('/utilisateur', deleteProduit)

module.exports = router;