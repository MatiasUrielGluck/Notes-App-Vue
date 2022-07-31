<template>
  <div class="view">
    <view-component :archived="0"/>
  </div>
</template>

<script>
import ViewComponent from '../components/ViewComponent.vue'
// @ is an alias to /src

export default {
  name: 'NotesView',
  components: {
    ViewComponent
  }
}
</script>
