import Api from './Api'
import store from '../../store'
import Categories from '../Categories'

export default {
    getNotes: async function() {
        let data = null
        await Api().get('/')
        .then(res => {
            data = res.data
        })
        .catch(err => {
            console.log(err)
        })
        return data
    },

    createNote: async function(object) {
        await Api().post('/', object)
        .catch(err => {
            console.log(err)
        })

        this.updateStoreNotes(await this.getNotes())
    },

    updateNote: async function(url, object) {
        Api().patch(url, object)
        .catch(err => {
            console.log(err)
        })

        this.updateStoreNotes(await this.getNotes())
    },

    deleteNote: async function(url) {
        Api().delete(url)
        .catch(err => {
            console.log(err)
        })

        this.updateStoreNotes(await this.getNotes())
    },

    addCategory: async function(categoryBody, note) {
        if (!store.state.categories.find(category => { return category.name.toLowerCase() === categoryBody.name.toLowerCase() })) {
            await Categories.createCategory(categoryBody)
        }

        const newCategory = store.state.categories.find(category => {
            return category.name.toLowerCase() === categoryBody.name.toLowerCase()
        })

        // ENLAZAR
        await Api().post('/' + note.id, {
            categoryId: newCategory.id
        })
        .catch(err => {
            console.log(err)
        })

        this.updateStoreNotes(await this.getNotes())
    },

    removeCategory: async function(url, categoryId) {
        // TODO
        // Desenlazar la categoría.
        // Luego, si la categoría no pertenece a ninguna nota, eliminar la categoría desde el servicio de categoría
        Api().delete(url)
        .catch(err => {
            console.log(err)
        })

        Categories.updateStoreCategories(await Categories.getCategories())

        const cats = await Categories.getCategory(categoryId)
        for (const category of cats) {
            if(!category.Notes.length) {
                await Categories.deleteCategory('/' + categoryId)
                Categories.updateStoreCategories(await Categories.getCategories())
            }
        }
    },

    updateStoreNotes: function(newValue) {
        store.state.notes = newValue
    }
}