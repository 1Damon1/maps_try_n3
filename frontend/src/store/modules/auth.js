import axios from 'axios'

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
    async login({ commit }, creds) {
      const { data } = await axios.post('/api/auth/login', creds)
      commit('SET_USER', data.user)
      return data
    },
    logout({ commit }) {
      commit('CLEAR_USER')
    }
  }
}