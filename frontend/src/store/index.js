import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showCreateEditWindow: false,
    createEditType: 'create',
    selectedNote: null,
    title: '',
    content: '',

    notes: []
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
