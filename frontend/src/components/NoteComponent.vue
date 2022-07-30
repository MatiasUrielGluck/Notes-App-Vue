<template>
  <div class="note">
    <div class="info-container">
      <i class="fa-solid fa-note-sticky fa-3x"></i>
      <div class="info">
        <p>{{title}}</p>
        <p>Last edited: {{date}}</p>
      </div>
    </div>
    <div class="action-container">
      <i @click="archive()" class="fa-solid fa-box-archive fa-xl"></i>
      <i @click="edit()" class="fa-solid fa-pen fa-xl"></i>
      <i @click="remove()" class="fa-solid fa-trash-can fa-xl"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NoteComponent',
  props: {
    id: Number,
    title: String,
    date: String
  },

  methods: {
    archive() {
      
    },

    edit() {

    },

    remove() {

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
