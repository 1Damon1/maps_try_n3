<!-- frontend/src/components/CustomInput.vue -->
<template>
  <a-input
    v-bind="attrs"
    v-model:value="modelValue"
    @input="updateValue"
    :placeholder="placeholder"
    class="custom-input"
  />
</template>

<script setup>
import { toRefs } from 'vue'
import { Input } from 'ant-design-vue'

const props = defineProps({
  modelValue: String,
  placeholder: String,
})
const emit = defineEmits(['update:modelValue'])
const { modelValue } = toRefs(props)

function updateValue(e) {
  emit('update:modelValue', e.target.value)
}
</script>

<style scoped>
.custom-input {
  border-radius: 8px;
  padding: 8px 12px;
  background: #232323;
  color: #fff;
  border: 1px solid #444;
}
.custom-input:hover,
.custom-input:focus {
  border-color: #1ed760;
}
</style>
