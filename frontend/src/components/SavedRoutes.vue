<template>
  <div class="saved-routes">
    <div v-if="routes.length === 0" class="empty">
      Нет сохраненных маршрутов
    </div>
    <div
      v-for="(route, index) in routes"
      :key="index"
      class="route-card"
    >
      <div class="route-info">
        <div class="route-address">
          <span>📍 {{ route.start }}</span>
          <span>→</span>
          <span>🏁 {{ route.end }}</span>
        </div>
        <div class="route-stats">
          <span>🛣 {{ route.distance }} км</span>
          <span>⏱ {{ route.duration }} мин</span>
        </div>
      </div>
      <button
        @click="deleteRoute(index)"
        class="delete-btn"
      >
        Удалить
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SavedRoutes',
  computed: {
    routes() {
      return this.$store.getters.sortedRoutes
    }
  },
  methods: {
    deleteRoute(index) {
      this.$store.dispatch('deleteRoute', index)
    }
  }
}
</script>

<style scoped>
.saved-routes {
  padding: 1rem;
}

.route-card {
  background: var(--card-bg);
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.route-address {
  display: grid;
  gap: 0.5rem;
}

.route-stats {
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
  opacity: 0.8;
}

.delete-btn {
  background: var(--error-color);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: opacity 0.2s;
}

.delete-btn:hover {
  opacity: 0.8;
}

.empty {
  text-align: center;
  padding: 2rem;
  opacity: 0.6;
}
</style>
