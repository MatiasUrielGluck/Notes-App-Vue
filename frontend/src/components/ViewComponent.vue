<template>
  <div class="window">
    <i class="fa-solid fa-circle-user fa-xl" id="userProfile" @click="toggleProfile"></i>
    <button @click="logout()" id="logOut" :class="profileStatus">Logout</button>
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
        <div class="filter-row">
          <label for="categoryFilter">Category filter</label>
          <select name="categoryFilter" id="categoryFilter" v-model="selectedFilter">
            <option>All</option>
            <option v-for="(category, index) in localCategories" :key="index">{{category.name}}</option>
          </select>
        </div>
      </div>
      <div class="content-container">
        <notes-display :archived="archived" :filter="selectedFilter" :key="selectedFilter"/>
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
import Categories from '../services/Categories'
import router from '@/router'
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
      localCategories: null,
      selectedFilter: 'All',

      profileStatus: 'hidden'
    }
  },

  methods: {
    logout() {
      sessionStorage.removeItem('username')
      router.push('/login')
    },

    toggleProfile() {
      if (this.profileStatus === 'hidden') {
        this.profileStatus = 'active' 
      }
      else { 
        this.profileStatus = 'hidden'
      }
    }
  },

  computed: mapState(['showCreateEditWindow', 'createEditType', 'selectedNote', 'showDeleteWindow', 'categories']),

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
    },

    categories(newValue) {
      this.localCategories = newValue
    }
  },

  async mounted() {
    this.localCategories = await Categories.getCategories()
  }
}
</script>

<style scoped>
@import '../../public/styles.css';
  #userProfile {
    position: absolute;
    top: 1rem;
    right: 1rem;
  }

  #logOut {
    position: absolute;
    top: 2rem;
    right: 1rem;
    color: black;
    background: var(--secondary-bcolor);
    padding: 0.2rem 0.6rem;
  }

  .hidden {
    display: none;
  }

  .active {
    display: inline-block;
  }

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

   .top-row a {
    padding: 0.5rem 1rem;
    text-decoration: none;
    background: var(--secondary-bcolor);
    border-radius: 12px;
    color: black;
    transition: all 0.3s ease;
  }

  .top-row a:hover {
    transform: scale(102%);
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }

  .top-row button {
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
    border-radius: 12px;
    height: 60vh;
    overflow: auto;
  }

  .content-container::-webkit-scrollbar {
    -webkit-appearance: none;
  }

  .content-container::-webkit-scrollbar:vertical {
      width: 14px;
  }

  .content-container::-webkit-scrollbar-thumb {
      border-radius: 8px;
      border: 2px solid white;
      background-color: var(--primary-bcolor);
  }

  .content-container::-webkit-scrollbar-track:vertical {
      border-radius: 8px;
      background: rgba(0, 0, 0, .1);
  }

  @media only screen and (max-width: 600px) {
    .top-row {
      flex-flow: column nowrap;
    }
  }

  .filter-row {
    display: flex;
    gap: 0.5rem;
  }
</style>
