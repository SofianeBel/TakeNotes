const Note = require('../models/Note');

const getAllNotes = async (req, res) => {
    try {
        const notes = await Note.getAllNotes(req.session.userId);
        res.render('index', { notes });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

const getCreateNote = (req, res) => {
    res.render('addNote');
};

const createNote = async (req, res) => {
    const { title, content } = req.body;
    try {
        await Note.createNote(req.session.userId, title, content);
        res.redirect('/notes');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

const getEditNote = async (req, res) => {
    const { id } = req.params;
    try {
        const note = await Note.getNoteById(id, req.session.userId);
        if (!note) {
            return res.status(404).send('Note not found');
        }
        res.render('editNote', { note });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

const updateNote = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    try {
        await Note.updateNote(id, req.session.userId, title, content);
        res.redirect('/notes');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

const deleteNote = async (req, res) => {
    const { id } = req.params;
    try {
        await Note.deleteNote(id, req.session.userId);
        res.redirect('/notes');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    getAllNotes,
    getCreateNote,
    createNote,
    getEditNote,
    updateNote,
    deleteNote
};
