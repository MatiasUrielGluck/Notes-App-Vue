<template>
  <div class="external-window">
    <div class="internal-window">
        <h1 v-if="type === 'create'">Create Note</h1>
        <h1 v-if="type === 'edit'">Edit Note</h1>

        <div class="container">
            <label for="title">Title</label>
            <input type="text" name="title" id="title" v-model="localTitle">
            <p>Content</p>
            <span class="content" v-html="localContent" contenteditable="true" @input="updateLocalContent"></span>
            <p>Categories</p>
            <div class="categories-container">
                <category-component v-for="(category, index) in localCategories" :key="index" :category="category" :directNote="localNote"/>
            </div>
        </div>

        <div class="new-category-container">
            <label for="category">Add category</label>
            <input type="text" name="category" id="category" v-model="newCategoryInput">
            <button @click="addCategory()">Add</button>
        </div>

        <div class="action-container">
            <button @click="cancel()">Cancel</button>
            <button @click="save()">Save</button>
        </div>
    </div>
  </div>
</template>

<script>
import store from '@/store'
import Notes from '../services/Notes'
import { mapState } from 'vuex'
import CategoryComponent from './CategoryComponent.vue'

export default {
  components: { CategoryComponent },
  name: 'CreateEditWindow',
  props: {
    type: String,
    id: Number
  },

  data: function() {
    return {
        localNote: null,
        localId: this.id,
        showCreateEditWindow: store.state.showCreateEditWindow,
        localTitle: '',
        localContent: '',
        tempContent: '',

        localCategories: null,

        newCategoryInput: '',
    }
  },

  methods: {
    updateLocalContent(e) {
        this.tempContent = e.target.innerHTML
    },

    cancel() {
        this.showCreateEditWindow = false
        store.state.createEditType = 'create'
        this.localNote = null
        store.state.selectedNote = ''
        store.state.title = ''
        store.state.content = ''
    },

    async save() {
        if (store.state.createEditType === 'create') {
            await Notes.createNote({
                title: this.localTitle,
                content: this.tempContent,
            })

        } else if (store.state.createEditType === 'edit') {
            await Notes.updateNote('/' + this.localId, {
                title: this.localTitle,
                content: this.tempContent,
                archived: store.state.selectedNote.archived
            })
        }

        Notes.updateStoreNotes(await Notes.getNotes())
        this.cancel()
    },

    async addCategory() {
        if (!this.localNote) {
            alert('Please, save your new note before adding categories')
            return
        }

        if (this.localNote.Categories.find(category => category.name === this.newCategoryInput)) {
            return
        }

        await Notes.addCategory({
            name: this.newCategoryInput
        }, this.localNote)

        const newCategory = store.state.categories.find(category => category.name === this.newCategoryInput)
        this.localNote.Categories.push(newCategory)
        this.newCategoryInput = ''
    },

    loadInfo() {
        if (store.state.selectedNote) {
            // Notes info
            this.localNote = store.state.selectedNote
            this.localTitle = store.state.selectedNote.title
            this.localContent = store.state.selectedNote.content
            this.tempContent = store.state.selectedNote.content

            this.localCategories = this.localNote.Categories
        }
    }
  },
  
  computed: mapState(['title', 'content']),

  watch: {
    showCreateEditWindow(newValue) {
      store.state.showCreateEditWindow = newValue
    },

    title(newValue) {
        this.localTitle = newValue
    },

    content(newValue) {
      this.localContent = newValue
    }
  },

  mounted() {
    this.loadInfo()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.external-window {
    position: absolute;
    top: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
}

.internal-window {
    z-index: 2;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    width: 40%;
    height: 95%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-evenly;
    background: #fff;
    border-radius: 12px;
    padding: 2rem;
}

@media only screen and (max-width:1280px) {
    .internal-window {
        width: 70%;
    }
}

@media only screen and (max-width:400px) {
    .internal-window {
        width: 90%;
        height: 70%;
    }
}

.container {
    display: grid;
    grid-template-columns: 20% 80%;
    row-gap: 10%;
    overflow: scroll;
}

h1 {
    text-align: center;
}

input, .content {
    border: 1px solid rgb(182, 182, 182);
    padding: 0.5rem;
}

.content {
    display: inline-block;
    width: 100%;
    height: 200px;
    overflow: scroll;
}

@media only screen and (max-width:680px) {
    .container {
        grid-template-columns: 25% 75%;
    }
    .content {
        height: 150px;
    }
}

.action-container {
    
    margin-top: 2rem;
    align-self: center;
    display: flex;
    gap: 2rem;
}

.action-container button {
    padding: 0.5rem 1rem;
}

.categories-container {
    display: grid;
    grid-template-columns: 45% 45%;
    column-gap: 10%;
    row-gap: 1rem;
    padding: 1rem;
    height: fit-content;
    width: 100%;
    border: 1px solid rgb(182, 182, 182);
}

.new-category-container {
    display: grid;
    grid-template-columns: 20% 60% 20%;
}

.new-category-container button {
    margin-left: 10%;
}

</style>
