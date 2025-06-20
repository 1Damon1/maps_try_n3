<template>
  <div class="saved-routes">
    <h3>Сохранённые маршруты</h3>
    <ul>
      <li v-for="(route, index) in savedRoutes" :key="route.date">
        <span>{{ route.start }} → {{ route.end }}</span>
        <span>({{ route.date | formatDate }})</span>
        <button @click="$emit('apply', route)">Применить</button>
        <button @click="removeLocal(index)">Удалить</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SavedRoutes',
  props: {
    savedRoutes: {
      type: Array,
      required: true
    }
  },
  methods: {
    removeLocal(index) {
      this.$emit('delete', index)
    }
  },
  filters: {
    formatDate(value) {
      return new Date(value).toLocaleString()
    }
  }
}
</script>

<style scoped>
.saved-routes {
  margin-top: 16px;
}
.saved-routes ul {
  list-style: none;
  padding: 0;
}
.saved-routes li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid var(--border-color);
}
.saved-routes button {
  margin-left: 8px;
}
</style>