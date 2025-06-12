<template>
  <div class="auth-modal" v-if="show">
    <div class="modal-content">
      <button class="close-button" @click="$emit('close')">×</button>
      <h2>Авторизация</h2>
      <!-- Добавьте форму авторизации -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.auth-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
}

.modal-content {
  background: var(--color-bg);
  padding: 2rem;
  border-radius: 12px;
  position: relative;
  min-width: 400px;
}

.close-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
}
</style>
