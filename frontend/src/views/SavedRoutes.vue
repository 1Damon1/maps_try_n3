<template>
  <div class="saved-routes-view">
    <h1>Сохранённые маршруты</h1>
    <SavedRoutesComponent />
  </div>
</template>

<script>
import SavedRoutesComponent from '@/components/SavedRoutes.vue'

export default {
  name: 'SavedRoutesView',
  components: {
    SavedRoutesComponent
  }
}
</script>

<style scoped>
.saved-routes-view {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}
</style>

