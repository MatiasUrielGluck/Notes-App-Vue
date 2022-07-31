<template>
  <div class="external-window">
    <div class="internal-window">
        <h1>Are you sure you want to delete this note?</h1>
        <div class="action-container">
            <button @click="yes()">Yes</button>
            <button @click="no()">No</button>
        </div>
    </div>
  </div>
</template>

<script>
import store from '@/store'
import Notes from '../services/Notes'

export default {
  name: 'DeleteWindow',

  methods: {
    async yes() {
        Notes.deleteNote('/' + store.state.noteToDelete.id)
        Notes.updateStoreNotes(await Notes.getNotes())
        this.no()
    },

    no() {
        store.state.showDeleteWindow = false
        store.state.noteToDelete = null
    }
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
    width: fit-content;
    height: fit-content;
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
    }
}

h1 {
    text-align: center;
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

</style>
