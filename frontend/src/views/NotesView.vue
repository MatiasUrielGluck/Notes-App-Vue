<template>
  <div class="window">
    <create-edit-window :type="localType" :id="localNote" v-if="localCreateEdit"/>
    <div class="container">
      <div class="top-row">
        <h1>My Notes</h1>
        <button @click="localCreateEdit = true">Create note</button>
        <router-link to="/archived">Archived notes</router-link>
      </div>
      <notes-display :archived="false"/>
    </div>
  </div>
</template>

<script>
import NotesDisplay from '@/components/NotesDisplay.vue'
import CreateEditWindow from '@/components/CreateEditWindow.vue'
import store from '@/store'
import { mapState } from 'vuex'
// @ is an alias to /src

export default {
  name: 'NotesView',
  components: {
    NotesDisplay,
    CreateEditWindow
  },
  data: function() {
    return {
      localCreateEdit: store.state.showCreateEditWindow,
      localType: store.state.createEditType,
      localNote: store.state.selectedNote
    }
  },

  computed: mapState(['showCreateEditWindow', 'createEditType', 'selectedNote']),

  watch: {
    localCreateEdit(newValue) {
      store.state.showCreateEditWindow = newValue
    },

    showCreateEditWindow(newValue) {
      this.localCreateEdit = newValue
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
