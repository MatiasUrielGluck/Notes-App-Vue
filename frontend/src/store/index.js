import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // CreateEditWindow
    showCreateEditWindow: false,
    createEditType: 'create',
    selectedNote: null,
    title: '',
    content: '',

    // DeleteWindow
    showDeleteWindow: false,
    noteToDelete: null,

    // Notes
    notes: [],

    // Categories
    categories: [],
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
