export default {
  namespaced: true,

  state: () => ({
    isDark: localStorage.getItem('theme') === 'dark' || false
  }),

  mutations: {
    TOGGLE_THEME(state) {
      state.isDark = !state.isDark
      localStorage.setItem('theme', state.isDark ? 'dark' : 'light')
      document.documentElement.classList.toggle('dark', state.isDark)
    }
  },

  actions: {
    initializeTheme({ state }) {
      document.documentElement.classList.toggle('dark', state.isDark)
    }
  }
}
