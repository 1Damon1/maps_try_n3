<!-- frontend/src/components/MapTopbar.vue -->
<template>
</template>

<script setup>
import { reactive, watch, h } from 'vue'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
  BulbOutlined,
} from '@ant-design/icons-vue'
import { Layout, Button, Menu } from 'ant-design-vue'

const { Sider } = Layout

const state = reactive({
  collapsed: false,
  selectedKeys: ['1'],
  openKeys: ['sub1'],
  preOpenKeys: ['sub1'],
})

// Список пунктов меню
const items = [
  {
    key: '1',
    icon: () => h(MenuFoldOutlined),
    label: 'Панель 1',
  },
  {
    key: '2',
    icon: () => h(MailOutlined),
    label: 'Письма',
  },
  {
    key: 'sub1',
    icon: () => h(AppstoreOutlined),
    label: 'Подменю',
    children: [
      { key: '5', label: 'Опция 5' },
      { key: '6', label: 'Опция 6' },
    ],
  },
]

watch(
  () => state.openKeys,
  (newVal, oldVal) => {
    state.preOpenKeys = oldVal
  }
)

function toggleCollapsed() {
  state.collapsed = !state.collapsed
  state.openKeys = state.collapsed ? [] : [...state.preOpenKeys]
}
function onOpenChange(keys) {
  state.openKeys = keys
}
function onSelect({ key }) {
  state.selectedKeys = [key]
}
</script>

<style scoped>
.map-sider {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.map-topbar-actions {
  padding: 16px;
  display: flex;
  justify-content: space-around;
}
</style>
