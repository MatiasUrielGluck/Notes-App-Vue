import Api from './Api'
import store from '../../store'

export default {
    getNotes: async function() {
        const data = await Api().get('/')
        return data.data
    },

    createNote: async function(object) {
        await Api().post('/', object)
        .catch(err => {
            console.log(err)
        })
    },

    updateNote: async function(url, object) {
        Api().patch(url, object)
        .catch(err => {
            console.log(err)
        })
    },

    deleteNote: async function(url) {
        Api().delete(url)
        .catch(err => {
            console.log(err)
        })
    },

    updateStoreNotes: function(newValue) {
        store.state.notes = newValue
    }
}