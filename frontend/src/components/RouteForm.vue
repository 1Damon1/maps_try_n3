<template>
  <a-form layout="vertical" class="route-form" @submit.prevent>
    <a-form-item label="Откуда">
      <a-input
        v-model:value="start"
        placeholder="Введите точку отправления"
        allow-clear
        prefix-icon="environment-outlined"
      />
    </a-form-item>
    <a-form-item label="Куда">
      <a-input
        v-model:value="end"
        placeholder="Введите точку назначения"
        allow-clear
        prefix-icon="environment-outlined"
      />
    </a-form-item>
    <a-form-item>
      <a-button
        type="primary"
        block
        :disabled="!canBuildRoute"
        @click="$emit('buildRoute')"
      >
        Построить маршрут
      </a-button>
    </a-form-item>
    <a-form-item>
      <a-button
        type="default"
        block
        @click="$emit('saveRoute')"
      >
        Сохранить маршрут
      </a-button>
    </a-form-item>
    <a-form-item>
      <a-button
        type="dashed"
        block
        @click="$emit('shareRoute')"
      >
        Поделиться маршрутом
      </a-button>
    </a-form-item>
    <div v-if="routeInfo" class="route-info">
      <a-alert
        type="info"
        :message="routeInfo"
        show-icon
      />
    </div>
  </a-form>
</template>

<script setup>
import { ref, watch } from 'vue'
import { EnvironmentOutlined } from '@ant-design/icons-vue'

const props = defineProps(['start', 'end', 'canBuildRoute', 'routeInfo'])
const emit = defineEmits(['update:start', 'update:end', 'buildRoute', 'saveRoute', 'shareRoute'])

const start = ref(props.start)
const end = ref(props.end)

watch(start, (v) => emit('update:start', v))
watch(end, (v) => emit('update:end', v))
</script>

<style scoped>
.route-form {
  padding: 12px 0;
}
.route-info {
  margin-top: 16px;
}
</style>
