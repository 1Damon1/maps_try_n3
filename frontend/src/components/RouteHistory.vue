<template>
  <div class="route-history">
    <div
      class="route-card"
      v-for="(r, i) in routes"
      :key="r.id || i"
    >
      <span class="route-title">{{ r.start }} → {{ r.end }}</span>
      <CustomButton icon="mdi-check" @click="$emit('applyRoute', r)" />
      <CustomButton icon="mdi-delete" color="error" @click="$emit('deleteRoute', i)" />
    </div>
  </div>
</template>

<script setup>
import CustomButton from './CustomButton.vue'
defineProps({ routes: Array })
defineEmits(['applyRoute', 'deleteRoute'])
</script>

<style scoped>
.route-history {
  margin-bottom: 16px;
}
.route-card {
  background: rgba(32,32,32,0.82);
  border-radius: 14px;
  box-shadow: 0 2px 8px #e6fa4733;
  color: #fff;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  font-size: 15px;
  margin-bottom: 7px;
}
.route-title {
  flex: 1;
}
</style>
