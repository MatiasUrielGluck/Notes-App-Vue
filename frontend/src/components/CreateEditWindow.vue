<template>
  <div class="external-window">
    <div class="internal-window">
        <h1 v-if="type === 'create'">Create Note</h1>
        <h1 v-if="type === 'edit'">Edit Note</h1>

        <div class="container">
            <label for="title">Title</label>
            <input type="text" name="title" id="title">
            <p>Content</p>
            <div class="content" contenteditable="true"></div>
        </div>

        <div class="action-container">
            <button @click="showCreateEditWindow = false">Cancel</button>
            <button>Save</button>
        </div>
    </div>
  </div>
</template>

<script>
import store from '@/store'
export default {
  name: 'CreateEditWindow',
  props: {
    type: String
  },

  data: function() {
    return {
      showCreateEditWindow: store.state.showCreateEditWindow
    }
  },

  watch: {
    showCreateEditWindow(newValue) {
      store.state.showCreateEditWindow = newValue
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
    width: 40%;
    height: 80%;
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
}

h1 {
    text-align: center;
}

input, .content {
    border: 1px solid rgb(182, 182, 182);
    padding: 0.5rem;
}

.content {
    height: 200px;
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

</style>
