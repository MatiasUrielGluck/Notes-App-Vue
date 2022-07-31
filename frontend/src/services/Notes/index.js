import Api from './Api'
import store from '../../store'

export default {
    getNotes: async function() {
        const data = await Api().get('/')
        .catch(err => {
            console.log(err)
        })
        return data.data
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

    updateStoreNotes: function(newValue) {
        store.state.notes = newValue
    }
}