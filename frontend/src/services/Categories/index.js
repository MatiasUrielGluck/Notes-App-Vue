import Api from './Api'
import store from '../../store'

export default {
    getCategories: async function() {
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

    getCategory: async function(id) {
        const data = await Api().get('/' + id)
        .catch(err => {
            console.log(err)
        })
        return data.data
    },

    createCategory: async function(object) {
        await Api().post('/', object)
        .catch(err => {
            console.log(err)
        })

        this.updateStoreCategories(await this.getCategories())
    },

    // updateNote: async function(url, object) {
    //     Api().patch(url, object)
    //     .catch(err => {
    //         console.log(err)
    //     })

    //     // this.updateStoreNotes(await this.getNotes())
    // },

    deleteCategory: async function(url) {
        Api().delete(url)
        .catch(err => {
            console.log(err)
        })

        this.updateStoreCategories(await this.getCategories())
    },

    updateStoreCategories: function(newValue) {
        store.state.categories = newValue
    }
}