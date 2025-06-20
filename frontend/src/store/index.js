import { createStore } from 'vuex'

export default createStore({
  state: {
    routes: []
  },
  getters: {
    sortedRoutes: (state) => {
      return [...state.routes].sort((a, b) => new Date(b.date) - new Date(a.date))
    }
  },
  mutations: {
    SAVE_ROUTE(state, route) {
      state.routes.unshift(route)
    },
    DELETE_ROUTE(state, i) {
      state.routes.splice(i, 1)
    }
  },
  actions: {
    saveRoute({ commit }, route) {
      commit('SAVE_ROUTE', route)
    },
    deleteRoute({ commit }, i) {
      commit('DELETE_ROUTE', i)
    }
  }
})
