<template>
  <div class="note">
    <div class="info-container">
      <i class="fa-solid fa-note-sticky fa-3x"></i>
      <div class="info">
        <p>{{note.title}}</p>
        <p>Last edited: {{date}}</p>
      </div>
    </div>
    <div class="action-container">
      <i @click="archive()" v-if="!note.archived" class="fa-solid fa-box-archive fa-xl"></i>
      <i @click="unarchive()" v-if="note.archived" class="fa-solid fa-upload fa-xl"></i>
      <i @click="edit()" class="fa-solid fa-pen fa-xl"></i>
      <i @click="remove()" class="fa-solid fa-trash-can fa-xl"></i>
    </div>
  </div>
</template>

<script>
import store from '@/store'
import { mapState } from 'vuex'
import Notes from '../services/Notes'

export default {
  name: 'NoteComponent',
  props: {
    note: Object,
    date: String
  },

  data: function() {
    return {
      localNote: this.note,
      localCreateEdit: store.state.showCreateEditWindow
    }
  },

  computed: mapState(['showCreateEditWindow']),

  watch: {
    localCreateEdit(newValue) {
      store.state.showCreateEditWindow = newValue
    },

    showCreateEditWindow(newValue) {
      this.localCreateEdit = newValue
    }
  },

  methods: {
    async archive() {
      await Notes.updateNote('/' + this.note.id, {
        title: this.note.title,
        content: this.note.content,
        categories: this.note.categories,
        archived: true
      })
      Notes.updateStoreNotes(await Notes.getNotes())
    },

    async unarchive() {
      await Notes.updateNote('/' + this.note.id, {
        title: this.note.title,
        content: this.note.content,
        categories: this.note.categories,
        archived: false
      })
      Notes.updateStoreNotes(await Notes.getNotes())
    },

    edit() {
      store.state.showCreateEditWindow = true
      store.state.createEditType = 'edit'

      store.state.selectedNote = this.note
    },

    async remove() {
      store.state.showDeleteWindow = true
      store.state.noteToDelete = this.note
      // Notes.deleteNote('/' + this.note.id)
      // Notes.updateStoreNotes(await Notes.getNotes())
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.note {
  display: flex;
  justify-content: space-between;
  padding: 2rem;
  border: 1px solid black;
}

.info-container {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.info-container p:first-of-type {
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.action-container {
  align-self: center;
}

.action-container i {
  cursor: pointer;
  margin: 0 0.25rem;
}
</style>
