const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.registerGet = (req, res) => {
    res.render('register');
};

exports.registerPost = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existingUser = await User.findByUsername(username);
        if (existingUser) {
            req.flash('error', 'Nom d\'utilisateur déjà pris.');
            return res.redirect('/register');
        }

        const existingEmail = await User.findByEmail(email);
        if (existingEmail) {
            req.flash('error', 'Adresse email déjà enregistrée.');
            return res.redirect('/register');
        }

        const userId = await User.create(username, email, password);
        req.session.userId = userId;
        req.flash('success', 'Inscription réussie !');
        res.redirect('/notes');
    } catch (error) {
        console.error(error);
        req.flash('error', 'Erreur lors de l\'inscription.');
        res.redirect('/register');
    }
};

exports.loginGet = (req, res) => {
    res.render('login');
};

exports.loginPost = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findByUsername(username);
        if (!user) {
            req.flash('error', 'Utilisateur non trouvé.');
            return res.redirect('/login');
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            req.flash('error', 'Mot de passe incorrect.');
            return res.redirect('/login');
        }
        req.session.userId = user.id;
        req.flash('success', 'Connexion réussie !');
        res.redirect('/notes');
    } catch (error) {
        console.error(error);
        req.flash('error', 'Erreur lors de la connexion.');
        res.redirect('/login');
    }
};

exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.redirect('/notes');
        }
        res.clearCookie('connect.sid');
        res.redirect('/login');
    });
}; 