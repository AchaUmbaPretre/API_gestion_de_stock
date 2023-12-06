const express = require("express");
const { getProduit, postProduit, deleteProduit } = require("../controllers/productController");
const router = express.Router();

router.get('/', getProduit)
router.post('/produit', postProduit)
router.put('/produit', deleteProduit)

