<template>
  <div class="notes-container">
    <note-component v-for="(note, index) in localNotes" :key="index" :note="note" :date="createDate(note.updatedAt)"/>
  </div>
</template>

<script>
import NoteComponent from './NoteComponent.vue'
import store from '../store'
import Notes from '../services/Notes'
import { mapState } from 'vuex'

export default {
  components: {NoteComponent  },
  name: 'NotesDisplay',
  props: {
    archived: Number
  },

  data: function() {
    return {
      localNotes: store.state.notes
    }
  },

  methods: {
    // async getNotes() {
    //   const data = await Api().get('/')
    //   return data.data
    // },

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
      this.localNotes = newValue.filter(note => {
        return note.archived === this.archived
      })
    }
  },

  async mounted() {
    store.state.notes = await Notes.getNotes()
    // store.state.notes = await this.getNotes()
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
