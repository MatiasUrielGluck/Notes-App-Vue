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
import Categories from '../services/Categories'

export default {
  components: {NoteComponent  },
  name: 'NotesDisplay',
  props: {
    archived: Number,
    filter: String
  },

  data: function() {
    return {
      localNotes: store.state.notes
    }
  },

  methods: {
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
        return Number(note.archived) === this.archived
      })

      this.localNotes = this.localNotes.filter(note => {
        if (this.filter === 'All') {
          return note
        }

        for (const category of note.Categories) {
          if (category.name === this.filter) {
            return note
          }
        }
      })
    }
  },

  async mounted() {
    store.state.notes = await Notes.getNotes()
    store.state.categories = await Categories.getCategories()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.notes-container {
  display: grid;
  grid-template-columns: 48% 48%;
  column-gap: 4%;
  row-gap: 2rem;
}

@media only screen and (max-width: 500px) {
  .notes-container {
    grid-template-columns: 1fr;
  }
}
</style>
