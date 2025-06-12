// src/store/index.js
import { createStore } from 'vuex'

export default createStore({
  state: {
    theme: localStorage.getItem('theme') || 'light',
    savedRoutes: JSON.parse(localStorage.getItem('savedRoutes') || '[]')
  },
  mutations: {
    SET_THEME(state, theme) {
      state.theme = theme
      localStorage.setItem('theme', theme)
      document.documentElement.setAttribute('data-theme', theme)
    },
    ADD_ROUTE(state, route) {
      state.savedRoutes.push(route)
      localStorage.setItem('savedRoutes', JSON.stringify(state.savedRoutes))
    },
    REMOVE_ROUTE(state, index) {
      state.savedRoutes.splice(index, 1)
      localStorage.setItem('savedRoutes', JSON.stringify(state.savedRoutes))
    }
  },
  actions: {
    toggleTheme({ commit, state }) {
      const newTheme = state.theme === 'light' ? 'dark' : 'light'
      commit('SET_THEME', newTheme)
    },
    saveRoute({ commit }, route) {
      commit('ADD_ROUTE', {
        ...route,
        date: new Date().toISOString()
      })
    },
    deleteRoute({ commit }, index) {
      commit('REMOVE_ROUTE', index)
    }
  },
  getters: {
    sortedRoutes: (state) => {
      return [...state.savedRoutes].sort((a, b) =>
        new Date(b.date) - new Date(a.date)
      )
    }
  }
})
