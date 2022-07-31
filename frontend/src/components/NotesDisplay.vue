<template>
  <div class="notes-container">
    <note-component v-for="note in localNotes" :key="note.id" :note="note" :date="createDate(note.updatedAt)"/>
    <!-- <note-component :id="1" title="Esta es una nota" date="30/07/2022"/> -->
  </div>
</template>

<script>
import NoteComponent from './NoteComponent.vue'
import store from '../store'
import Api from '../services/Api'
import { mapState } from 'vuex'

export default {
  components: {NoteComponent  },
  name: 'NotesDisplay',
  props: {
    archived: Boolean
  },

  data: function() {
    return {
      localNotes: store.state.notes
    }
  },

  methods: {
    async getNotes() {
      const data = await Api().get('/')
      return data.data
    },

    createDate(string) {
      let date = new Date(string).toDateString()
      let formatedDate = ''
      formatedDate = date.slice(8, 10) + '/' + date.slice(4, 7) + '/' + date.slice(11, 15)
      return formatedDate
    }
  },

  computed: mapState(['notes']),

  watch: {
    notes(newValue) {
      this.localNotes = newValue
    }
  },

  async mounted() {
    store.state.notes = await this.getNotes()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.notes-container {
  margin-top: 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}
</style>
