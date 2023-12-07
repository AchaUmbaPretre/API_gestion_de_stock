const express = require('express')

const router = express.Router()

router.get('/vente', getClient)
router.post('/vente', postClient)

module.exports = router;