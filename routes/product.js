const express = require("express");
const { getProduit, postProduit, deleteProduit, getCategorie, postCategorie, getEmplacement, postEmplacement, putProduit, deleteCategorie, deleteEmplacement, putCategorie, putEmplacement, getCouleur, getProduitView } = require("../controllers/productController.js");
const router = express.Router();

router.get('/', getProduit)
router.get('/produitView/:id', getProduitView)
router.post('/produit', postProduit)
router.put('/produitDelete/:id', deleteProduit)
router.put('/produit/:id', putProduit)

router.get('/couleur', getCouleur);

router.get('/categorie', getCategorie);
router.post('/categorie', postCategorie)
router.delete('/categorie/:id', deleteCategorie)
router.put('/categorie/:id', putCategorie)

router.get('/emplacement', getEmplacement)
router.post('/emplacement', postEmplacement)
router.delete('/emplacement/:id', deleteEmplacement)
router.put('/categorie/:id', putEmplacement)

module.exports = router;