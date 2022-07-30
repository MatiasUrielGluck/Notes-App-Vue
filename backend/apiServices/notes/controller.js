const noteDao = require('./dao')

module.exports = {
    async getNotes(req, res) {
        const notes = await noteDao.getNotes()
        res.send(JSON.stringify(notes))
    },

    async getNote(req, res) {
        const { id } = req.params
        const note = await noteDao.getNote(id)
        res.send(JSON.stringify(note))
    },
    
    async createNote(req, res) {
        const { title, content, categories, archived } = req.body
        const note = await noteDao.createNote(title, content, categories, archived)
        res.send(JSON.stringify(note))
    },
    
    async updateNote(req, res) {
        const { id } = req.params
        const { title, content, categories, archived } = req.body
        const note = await noteDao.updateNote(id, title, content, categories, archived)
        res.send(JSON.stringify(note))
    },

    async deleteNote(req, res) {
        const { id } = req.params
        const note = await noteDao.deleteNote(id)
        res.send(JSON.stringify(note))
    }
}