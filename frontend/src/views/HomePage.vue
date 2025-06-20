<template>
  <div style="min-height:100vh; display:flex; flex-direction:column; align-items:center; justify-content:center; background:#181818;">
    <h1 style="color:#fff; font-size:2.5rem;">Веломаршруты</h1>
    <p style="color:#ccc; font-size:1.15rem; margin-bottom:2rem;">Добро пожаловать! Найдите и постройте лучший велосипедный маршрут по городу.</p>
    <router-link to="/map">
      <a-button type="primary" size="large">Перейти к карте</a-button>
    </router-link>
  </div>
</template>
<script setup>
import { RouterLink } from 'vue-router'
import { Button as AButton } from 'ant-design-vue'
</script>
