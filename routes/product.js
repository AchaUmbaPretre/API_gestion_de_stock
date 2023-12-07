const express = require("express");
const { getProduit, postProduit, deleteProduit, getCategorie, postCategorie, getEmplacement, postEmplacement, putProduit, deleteCategorie, deleteEmplacement } = require("../controllers/productController.js");
const router = express.Router();

router.get('/', getProduit)
router.post('/produit', postProduit)
router.put('/produit', deleteProduit)
router.put('/produit', putProduit)

router.get('/categorie', getCategorie);
router.post('/categorie', postCategorie)
router.delete('/categorie', deleteCategorie)

router.get('/emplacement', getEmplacement)
router.post('/emplacement', postEmplacement)
router.delete('/emplacement', deleteEmplacement)

module.exports = router;