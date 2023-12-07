const express = require('express')

const router = express.Router()

router.get('/client', getProduit)
router.post('/client', postProduit)
router.put('/client', deleteProduit)

router.get('/livreur', getProduit)
router.post('/livreur', postProduit)
router.put('/livreur', deleteProduit)

router.get('/utilisateur', getProduit)
router.post('/utilisateur', postProduit)
router.put('/utilisateur', deleteProduit)

module.exports = router;