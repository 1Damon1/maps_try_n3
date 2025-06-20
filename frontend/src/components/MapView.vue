<!-- frontend/src/components/MapView.vue -->
<template>
  <div id="map" class="map-container"></div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  if (!window._mapInitialized && window.ymaps) {
    window.ymaps.ready(() => {
      window._mapInitialized = true
      new window.ymaps.Map('map', {
        center: [45.03547, 38.97531],
        zoom: 12,
        controls: ['zoomControl'],
      })
    })
  }
})
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 100%;
  border-radius: 12px;
}
</style>
