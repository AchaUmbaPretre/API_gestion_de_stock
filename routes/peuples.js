const express = require('express')
const { getClient, postClient, putClient, deleteClient, getLivreur, postLivreur, deleteLivreur, putLivreur } = require('../controllers/peupleControllers')

const router = express.Router()

router.get('/client', getClient)
router.post('/client', postClient)
router.delete('/client', deleteClient)
router.put('/client', putClient)

router.get('/livreur', getLivreur)
router.post('/livreur', postLivreur)
router.put('/livreur', deleteLivreur)
router.put('/livreur', putLivreur)

router.get('/utilisateur')
router.post('/utilisateur')
router.put('/utilisateur')

module.exports = router;