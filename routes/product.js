const express = require("express");
const { getProduit, postProduit, deleteProduit, getCategorie, postCategorie, getEmplacement, postEmplacement } = require("../controllers/productController.js");
const router = express.Router();

router.get('/', getProduit)
router.post('/produit', postProduit)
router.put('/produit', deleteProduit)

router.get('/categorie', getCategorie);
router.post('/categorie', postCategorie)

router.get('/emplacement', getEmplacement)
router.post('/emplacement', postEmplacement)

module.exports = router;