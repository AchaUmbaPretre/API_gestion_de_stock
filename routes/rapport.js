const express = require('express');
const { getRapport } = require('../controllers/rapportControllers');
const router = express.Router();

router.get('/rapport', getRapport);

module.exports = router;