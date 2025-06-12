<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('auth', ['user'])  // Правильное обращение к namespaced модулю
  },
  methods: {
    async handleLogin() {
      try {
        await this.$store.dispatch('auth/login', this.credentials)
      } catch (error) {
        console.error('Login failed:', error)
      }
    },

    handleLogout() {
      this.$store.dispatch('auth/logout')
    }
  }
}
</script>

<template>
  <div class="auth-button">
    <button v-if="user" @click="handleLogout">
      Выйти ({{ user.username }})
    </button>
    <button v-else @click="$emit('show-auth')">
      Войти
    </button>
  </div>
</template>
