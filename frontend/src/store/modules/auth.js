export default {
  namespaced: true,

  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null
  }),

  mutations: {
    SET_USER(state, user) {
      state.user = user
      localStorage.setItem('user', JSON.stringify(user))
    },

    CLEAR_USER(state) {
      state.user = null
      localStorage.removeItem('user')
    }
  },

  actions: {
    login({ commit }, credentials) {
      return axios.post('/api/auth/login', credentials)
        .then(response => {
          commit('SET_USER', response.data.user)
          return response.data
        })
    },

    logout({ commit }) {
      commit('CLEAR_USER')
    }
  }
}
