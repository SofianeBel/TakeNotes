const pool = require('../config/db');
const bcrypt = require('bcrypt');

const User = {
    /**
     * Trouve un utilisateur par son nom d'utilisateur.
     */
    findByUsername: async (username) => {
        const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
        return rows[0];
    },

    /**
     * Trouve un utilisateur par son email.
     */
    findByEmail: async (email) => {
        const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    },

    /**
     * Crée un nouvel utilisateur.
     */
    create: async (username, email, password) => {
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await pool.query(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
            [username, email, hashedPassword]
        );
        return result.insertId;
    },

    // ... autres méthodes si nécessaire
};

module.exports = User; 