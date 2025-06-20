<template>
  <a-button
    :type="type"
    :shape="shape"
    :size="size"
    :loading="loading"
    :block="block"
    :disabled="disabled"
    :ghost="ghost"
    :danger="danger"
    :icon="iconComponent"
    class="custom-button"
    @click="handleClick"
  >
    <slot />
  </a-button>
</template>

<script setup>
import { computed, h } from 'vue'
import {
  UserOutlined,
  SearchOutlined,
  PlusOutlined,
  ArrowRightOutlined,
  LoadingOutlined
} from '@ant-design/icons-vue'

const props = defineProps({
  type: { type: String, default: 'primary' }, // 'primary' | 'default' | 'dashed' | 'text' | 'link'
  shape: { type: String, default: 'round' },  // 'circle' | 'round' | null
  size: { type: String, default: 'large' },   // 'small' | 'middle' | 'large'
  loading: Boolean,
  block: Boolean,
  disabled: Boolean,
  ghost: Boolean,
  danger: Boolean,
  icon: String, // 'user' | 'search' | 'plus' | 'arrow' | ...
})
const emit = defineEmits(['click'])

const iconComponent = computed(() => {
  switch (props.icon) {
    case 'user': return h(UserOutlined)
    case 'search': return h(SearchOutlined)
    case 'plus': return h(PlusOutlined)
    case 'arrow': return h(ArrowRightOutlined)
    case 'loading': return h(LoadingOutlined)
    default: return null
  }
})

function handleClick(e) {
  emit('click', e)
}
</script>

<style scoped>
.custom-button {
  font-weight: 700;
  border-radius: 30px !important;
  min-width: 110px;
  background: #1ed760 !important;
  color: #121212 !important;
  border: none !important;
  transition: background 0.16s, color 0.16s;
  box-shadow: 0 2px 18px #1ed76033;
}
.custom-button:hover,
.custom-button:focus {
  background: #19b84d !important;
  color: #fff !important;
  border: none !important;
}
.custom-button[disabled],
.custom-button:disabled {
  opacity: 0.5;
  background: #2d2d2d !important;
  color: #666 !important;
  border: none !important;
  box-shadow: none !important;
}
</style>
