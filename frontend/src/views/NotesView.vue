<template>
  <div class="view">
    <view-component :archived="0"/>
  </div>
</template>

<script>
import ViewComponent from '../components/ViewComponent.vue'
import router from '@/router'
// @ is an alias to /src

export default {
  name: 'NotesView',
  components: {
    ViewComponent
  },

  mounted() {
    if (!sessionStorage.getItem('username')) {
      router.push('/login')
    }
  }
}
</script>
