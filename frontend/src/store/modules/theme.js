export default {
  namespaced: true,
  state: () => ({
    theme: localStorage.getItem('theme') || 'light'
  }),
  mutations: {
    SET_THEME(state, theme) {
      state.theme = theme
      localStorage.setItem('theme', theme)
      document.documentElement.setAttribute('data-theme', theme)
    }
  },
  actions: {
    toggleTheme({ commit, state }) {
      const next = state.theme === 'light' ? 'dark' : 'light'
      commit('SET_THEME', next)
    }
  }
}