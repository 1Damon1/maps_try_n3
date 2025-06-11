<template>
  <div class="map-view">
    <RouteHistory @route-selected="handleRouteSelection" />
    <MapComponent ref="mapComponent" />
  </div>
</template>

<script>
import MapComponent from '@/components/MapComponent.vue'
import RouteHistory from '@/components/RouteHistory.vue'

export default {
  components: { MapComponent, RouteHistory },
  methods: {
    handleRouteSelection({ start, end }) {
      this.$refs.mapComponent.setRoute(start, end)
    }
  }
}
</script>

<style>
.map-view {
  display: flex;
  gap: 20px;
  padding: 20px;
}
</style>
