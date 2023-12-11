const express = require('express')
const { getClient, postClient, putClient, deleteClient, getLivreur, postLivreur, deleteLivreur, putLivreur, getUtilisateur, postUtilisateur, putUtilisateur, getProvince, getLivreurCount, getClientCount } = require('../controllers/peupleControllers')

const router = express.Router()

router.get('/', getClient)
router.get('/clientCount', getClientCount)
router.post('/client', postClient)
router.put('/clientDelete/:id', deleteClient)
router.put('/client/:id', putClient)

router.get('/province', getProvince)

router.get('/livreurCount', getLivreurCount)
router.get('/livreur', getLivreur)
router.post('/livreur', postLivreur)
router.put('/livreurDelete/:id', deleteLivreur)
router.put('/livreur/:id', putLivreur)

router.get('/utilisateur', getUtilisateur)
router.post('/utilisateur',postUtilisateur)
router.delete('/utilisateur/:id', putUtilisateur)

module.exports = router;