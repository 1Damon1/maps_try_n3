<template>
  <button
    class="theme-toggle"
    @click="toggleTheme"
    :aria-label="`Сменить тему на ${isDark ? 'светлую' : 'тёмную'}`"
  >
    <transition name="fade" mode="out-in">
      <span :key="isDark ? 'moon' : 'sun'">
        {{ isDark ? '🌙' : '☀️' }}
      </span>
    </transition>
  </button>
</template>

<script>
export default {
  computed: {
    isDark() {
      return this.$store.state.theme === 'dark'
    }
  },
  methods: {
    toggleTheme() {
      const newTheme = this.isDark ? 'light' : 'dark'
      this.$store.commit('SET_THEME', newTheme)
    }
  }
}
</script>


<style scoped>
.theme-toggle {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
  padding: 8px;
  transition: transform 0.2s;
  color: var(--text-color);
}

.theme-toggle:hover {
  transform: scale(1.1);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
