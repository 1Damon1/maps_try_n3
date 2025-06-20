<template>
  <a-layout style="min-height: 100vh; background: var(--primary-bg);">
    <Sidebar />
    <a-layout-content style="padding: 0 32px;">
      <MapTopbar />
      <MapView />
    </a-layout-content>
  </a-layout>
</template>

<script setup>
import Sidebar from '@/components/Sidebar.vue'
import MapTopbar from '@/components/MapTopbar.vue'
import MapView from '@/components/MapView.vue'
</script>
