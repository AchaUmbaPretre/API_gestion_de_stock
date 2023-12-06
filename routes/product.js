const express = require("express");
const { getProduit, postProduit, deleteProduit, getCategorie, postCategorie } = require("../controllers/productController.js");
const router = express.Router();

router.get('/', getProduit)
router.post('/produit', postProduit)
router.put('/produit', deleteProduit)

router.get('/categorie', getCategorie);
router.post('/categorie', postCategorie)

module.exports = router;