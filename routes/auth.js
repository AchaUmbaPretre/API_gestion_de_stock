const express = require('express');
const router = express.Router();
const { register, login, logout, getLogin, deleteUser } = require('../controllers/authControllers.js');

router.post('/register', register);
router.post('/login', login);
router.get('/loginGet', getLogin);
router.delete('/loginDelete/:id',deleteUser);
router.post('/logout', logout);

module.exports = router;