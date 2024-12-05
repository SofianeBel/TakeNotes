// modele d'une note
const pool = require('../config/db');

const Note = {
    getAllNotes: async (userId) => {
        const [rows] = await pool.query('SELECT * FROM notes WHERE user_id = ?', [userId]);
        return rows;
    },

    getNoteById: async (id, userId) => {
        const [rows] = await pool.query('SELECT * FROM notes WHERE id = ? AND user_id = ?', [id, userId]);
        return rows[0];
    },

    createNote: async (userId, title, content) => {
        const [result] = await pool.query('INSERT INTO notes (user_id, title, content) VALUES (?, ?, ?)', [userId, title, content]);
        return result.insertId;
    },

    updateNote: async (id, userId, title, content) => {
        await pool.query('UPDATE notes SET title = ?, content = ? WHERE id = ? AND user_id = ?', [title, content, id, userId]);
    },

    deleteNote: async (id, userId) => {
        await pool.query('DELETE FROM notes WHERE id = ? AND user_id = ?', [id, userId]);
    }
}

module.exports = Note;
