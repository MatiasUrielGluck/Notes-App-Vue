<template>
  <div class="view">
    <view-component :archived="1"/>
  </div>
</template>

<script>
import ViewComponent from '../components/ViewComponent.vue'
// @ is an alias to /src

export default {
  name: 'NotesView',
  components: {
    ViewComponent
  },
  data: function() {
    return {

    }
  }
}
</script>
