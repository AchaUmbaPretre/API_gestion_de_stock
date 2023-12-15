const express = require('express');
const { getRapport, getRapportVente } = require('../controllers/rapportControllers');
const router = express.Router();

router.get('/', getRapportVente);

module.exports = router;