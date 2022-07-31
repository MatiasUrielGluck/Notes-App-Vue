<template>
  <div class="window">
    <create-edit-window :type="localType" :id="localNote.id" v-if="localCreateEdit"/>
    <delete-window v-if="localDelete"/>
    <div class="container">
      <div class="top-row">
        <h1 v-if="!archived">My notes</h1>
        <h1 v-if="archived">Archived notes</h1>
        <div class="bottom-row">
          <button @click="localCreateEdit = true" v-if="!archived">Create note</button>
          <router-link to="/archived" v-if="!archived">Archived notes</router-link>
          <router-link to="/" v-if="archived">Go back to unarchived notes</router-link>
        </div>
      </div>
      <div class="content-container">
        <notes-display :archived="archived"/>
      </div>
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
    padding-bottom: 2rem;
    border-bottom: 2px solid black;
  }

  .top-row button {
    cursor: pointer;
    padding: 0.5rem 1rem;
  }

  .bottom-row {
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  .content-container {
    margin-top: 1rem;
    padding: 0.5rem;
    /* border: 1px solid black; */
    border-radius: 12px;
    height: 72vh;
    overflow: scroll;
  }

  @media only screen and (max-width: 600px) {
    .top-row {
      flex-flow: column nowrap;
    }
  }
</style>