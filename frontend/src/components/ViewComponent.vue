<template>
  <div class="window">
    <create-edit-window :type="localType" :id="localNote.id" v-if="localCreateEdit"/>
    <delete-window v-if="localDelete"/>
    <div class="container">
      <div class="top-row">
        <h1 v-if="!archived">My notes</h1>
        <h1 v-if="archived">Archived notes</h1>
        <button @click="localCreateEdit = true" v-if="!archived">Create note</button>
        <router-link to="/archived" v-if="!archived">Archived notes</router-link>
        <router-link to="/" v-if="archived">Go back to unarchived notes</router-link>
      </div>
      <notes-display :archived="archived"/>
    </div>
  </div>
</template>

<script>
import NotesDisplay from '@/components/NotesDisplay.vue'
import CreateEditWindow from '@/components/CreateEditWindow.vue'
import store from '@/store'
import { mapState } from 'vuex'
import DeleteWindow from './DeleteWindow.vue'
// @ is an alias to /src

export default {
  name: 'ViewComponent',
  props: {
    archived: Number
  },
  components: {
    NotesDisplay,
    CreateEditWindow,
    DeleteWindow
  },
  data: function() {
    return {
      localCreateEdit: store.state.showCreateEditWindow,
      localType: store.state.createEditType,
      localNote: '',
      localDelete: store.state.showDeleteWindow,
    }
  },

  computed: mapState(['showCreateEditWindow', 'createEditType', 'selectedNote', 'showDeleteWindow']),

  watch: {
    localCreateEdit(newValue) {
      store.state.showCreateEditWindow = newValue
    },

    showCreateEditWindow(newValue) {
      this.localCreateEdit = newValue
    },

    localDelete(newValue) {
      store.state.showDeleteWindow = newValue
    },

    showDeleteWindow(newValue) {
      this.localDelete = newValue
    },

    createEditType(newValue) {
      this.localType = newValue
    },

    selectedNote(newValue) {
      this.localNote = newValue
    }
  }
}
</script>

<style scoped>
  .container {
    margin: 2rem;
  }

  .top-row {
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  .top-row button {
    cursor: pointer;
    padding: 0.5rem 1rem;
  }
</style>
