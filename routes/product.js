const express = require("express");
const { getProduit, postProduit, deleteProduit, getCategorie, postCategorie, getEmplacement, postEmplacement, putProduit, deleteCategorie, deleteEmplacement } = require("../controllers/productController.js");
const router = express.Router();

router.get('/', getProduit)
router.post('/produit', postProduit)
router.put('/produitDelete/:id', deleteProduit)
router.put('/produit/:id', putProduit)

router.get('/categorie', getCategorie);
router.post('/categorie', postCategorie)
router.delete('/categorie/:id', deleteCategorie)
router.put('/categorie/:id', deleteCategorie)

router.get('/emplacement', getEmplacement)
router.post('/emplacement', postEmplacement)
router.delete('/emplacement/:id', deleteEmplacement)
router.put('/categorie/:id', deleteCategorie)

module.exports = router;