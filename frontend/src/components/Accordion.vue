<template>
  <a-collapse :bordered="false" ghost>
    <a-collapse-panel v-for="(item, i) in items" :key="i" :header="item.header">
      <slot :name="item.slot" v-if="item.slot"></slot>
      <div v-else>{{ item.content }}</div>
    </a-collapse-panel>
  </a-collapse>
</template>

<script setup>
const props = defineProps({
  items: { type: Array, default: () => [] }
});
</script>

<style scoped>
/* Antd Collapse уже тёмный, если тема dark */
</style>
