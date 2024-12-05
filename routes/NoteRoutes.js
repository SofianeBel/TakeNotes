// Définition des routes liées aux opérations sur les notes.
const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');
const { isAuthenticated } = require('../middleware/auth');

// Afficher toutes les notes
router.get('/', isAuthenticated, noteController.getAllNotes);

// Afficher le formulaire pour créer une nouvelle note
router.get('/add', isAuthenticated, noteController.getCreateNote);

// Traiter la création d'une nouvelle note
router.post('/add', isAuthenticated, noteController.createNote);

// Afficher le formulaire pour éditer une note
router.get('/edit/:id', isAuthenticated, noteController.getEditNote);

// Traiter la mise à jour d'une note
router.post('/edit/:id', isAuthenticated, noteController.updateNote);

// Supprimer une note
router.post('/delete/:id', isAuthenticated, noteController.deleteNote);

module.exports = router;

