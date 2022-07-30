<template>
  <div class="notes-container">
    <note-component :id="1" title="Esta es una nota" date="30/07/2022"/>
  </div>
</template>

<script>
import NoteComponent from './NoteComponent.vue'

export default {
  components: {NoteComponent  },
  name: 'NotesDisplay',
  props: {
    archived: Boolean
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
