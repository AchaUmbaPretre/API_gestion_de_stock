const express = require('express')
const { getClient, postClient, putClient, deleteClient, getLivreur, postLivreur, deleteLivreur, putLivreur, getUtilisateur, postUtilisateur, putUtilisateur } = require('../controllers/peupleControllers')

const router = express.Router()

router.get('/', getClient)
router.post('/client', postClient)
router.delete('/clientDelete/:id', deleteClient)
router.put('/client/:id', putClient)

router.get('/livreur', getLivreur)
router.post('/livreur', postLivreur)
router.put('/livreurDelete/:id', deleteLivreur)
router.put('/livreur/:id', putLivreur)

router.get('/utilisateur', getUtilisateur)
router.post('/utilisateur',postUtilisateur)
router.put('/utilisateur/:id', putUtilisateur)

module.exports = router;