const express = require('express');
const session = require('express-session');
const path = require('path');
const dotenv = require('dotenv');
const expressLayouts = require('express-ejs-layouts');
const flash = require('connect-flash');
const authRoutes = require('./routes/authRoutes');
const noteRoutes = require('./routes/NoteRoutes');

dotenv.config();

const app = express();

// Configuration des sessions
app.use(session({
    secret: process.env.SESSION_SECRET || 'default_secret',
    resave: false,
    saveUninitialized: false
}));

// Initialiser connect-flash
app.use(flash());

// Middlewares pour parser les corps de requêtes
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Utiliser express-ejs-layouts
app.use(expressLayouts);
app.set('layout', 'layouts/main');

// Définir le moteur de templates
app.set('view engine', 'ejs');

// Définir le dossier des vues
app.set('views', path.join(__dirname, 'views'));

// Servir les fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));

// Middleware pour rendre userId, error, et success disponibles dans toutes les vues
app.use((req, res, next) => {
    res.locals.userId = req.session.userId;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});

// Routes
app.use('/', authRoutes);
app.use('/notes', noteRoutes);

// Route par défaut
app.get('/', (req, res) => {
    res.redirect('/notes');
});

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
