const express = require("express");
const { getProduit, postProduit, deleteProduit, getCategorie, postCategorie, getEmplacement, postEmplacement, putProduit, deleteCategorie, deleteEmplacement, putCategorie, putEmplacement, getCouleur, getProduitView, getProduitCount, getMatiere, postMatiere, deleteMatiere, putMatiere, getMarque, postMarque, deleteMarque, putMarque, getProduitRecement, getProduitSelect } = require("../controllers/productController.js");
const router = express.Router();

router.get('/', getProduit)
router.get('/produitCount', getProduitCount)
router.get('/produitSelect', getProduitSelect)
router.get('/produitRecement', getProduitRecement)
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

router.get('/matiere', getMatiere)
router.post('/matiere', postMatiere)
router.delete('/matiere/:id', deleteMatiere)
router.put('/matiere/:id', putMatiere)

router.get('/marque', getMarque)
router.post('/marque', postMarque)
router.delete('/marque/:id', deleteMarque)
router.put('/marque/:id', putMarque)


module.exports = router;