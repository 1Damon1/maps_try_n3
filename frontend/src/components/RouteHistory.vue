<template>
  <div class="history">
    <h3>История маршрутов</h3>
    <div v-if="loading">Загрузка...</div>
    <div v-else>
      <div
        v-for="route in routes"
        :key="route.id"
        class="route-item"
        @click="showRoute(route)"
      >
        <div>Маршрут #{{ route.id }}</div>
        <div>{{ route.distance }} км</div>
        <div>{{ formatDate(route.created_at) }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      routes: [],
      loading: false
    }
  },
  methods: {
    async loadHistory() {
      this.loading = true
      try {
        const response = await axios.get('http://localhost:5000/api/routes')
        this.routes = response.data
      } catch (error) {
        console.error('Ошибка загрузки:', error)
      } finally {
        this.loading = false
      }
    },
    formatDate(dateString) {
      return new Date(dateString).toLocaleString()
    },
    showRoute(route) {
      this.$emit('route-selected', {
        start: route.start.split(',').map(Number),
        end: route.end.split(',').map(Number)
      })
    }
  },
  mounted() {
    this.loadHistory()
  }
}
</script>

<style scoped>
.history {
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.route-item {
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #eee;
  cursor: pointer;
  transition: background 0.3s;
}

.route-item:hover {
  background: #f8f9fa;
}
</style>
