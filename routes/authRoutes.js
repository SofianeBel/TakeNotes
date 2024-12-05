const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Afficher le formulaire d'inscription
router.get('/register', authController.registerGet);

// Traiter l'inscription
router.post('/register', authController.registerPost);

// Afficher le formulaire de connexion
router.get('/login', authController.loginGet);

// Traiter la connexion
router.post('/login', authController.loginPost);

// Déconnexion
router.get('/logout', authController.logout);

module.exports = router; 