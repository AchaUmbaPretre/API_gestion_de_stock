const express = require('express');
const { getRapport, getRapportVente, getRapportAchats } = require('../controllers/rapportControllers');
const router = express.Router();

router.get('/', getRapportVente);
router.get('/rapportAcha', getRapportAchats);

module.exports = router;