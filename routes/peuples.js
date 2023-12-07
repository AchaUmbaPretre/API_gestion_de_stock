const express = require('express')
const { getClient, postClient, putClient, deleteClient, getLivreur, postLivreur, deleteLivreur, putLivreur } = require('../controllers/peupleControllers')

const router = express.Router()

router.get('/', getClient)
router.post('/client', postClient)
router.delete('/clientDelete/:id', deleteClient)
router.put('/client/:id', putClient)

router.get('/livreur', getLivreur)
router.post('/livreur', postLivreur)
router.put('/livreurDelete/:id', deleteLivreur)
router.put('/livreur/:id', putLivreur)

router.get('/utilisateur')
router.post('/utilisateur')
router.put('/utilisateur/:id')

module.exports = router;