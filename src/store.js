import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from './router'

var production = !window.location.host.includes('localhost');
var baseUrl = production ? '//immersivews.herokuapp.com/' : '//localhost:3000/';
let auth = axios.create({
  baseURL: baseUrl + "auth/",
  timeout: 3000,
  withCredentials: true
})

let api = axios.create({
  baseURL: baseUrl + "api/",
  timeout: 60000,
  withCredentials: true
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
  },
  mutations: {
    setUser(state, user) {
      state.user = user

    },
    actions: {
      //AUTH STUFF
      // @ts-ignore
      register({ commit, dispatch }, newUser) {
        auth.post('register', newUser)
          .then(res => {
            commit('setUser', res.data)
            router.push({ name: 'profile' })
          })
      },
      authenticate({ commit, dispatch }) {
        auth.get('authenticate')
          .then(res => {
            commit('setUser', res.data)
            commit('setRating', (res.data.rating.reduce((a, b) => a + b, 0) / res.data.rating.length))
            router.push({ name: 'profile' })
            // @ts-ignore
            dispatch('getLends', this.state.user._id)
            // @ts-ignore
            dispatch('getBorrows', this.state.user._id)
            // @ts-ignore
            dispatch('join', this.state.user._id)
          })
      },
      login({ commit, dispatch }, creds) {
        auth.post('login', creds)
          .then(res => {
            commit('setUser', res.data)
            commit('setRating', (res.data.rating.reduce((a, b) => a + b, 0) / res.data.rating.length))
            router.push({ name: 'profile' })
            // @ts-ignore
            dispatch('getLends', this.state.user._id)
            // @ts-ignore
            dispatch('getBorrows', this.state.user._id)
          })
      },
      logout({ commit }) {
        auth.delete('logout')
          // @ts-ignore
          .then(res => {
            router.push({ name: 'home' })
            commit('setUser', {})
          })
      },
      updateProfilePicture({ dispatch }, userData) {
        api.put('user/edit', userData)
          .then(() => {
            dispatch('getUser')
          })
      },
    }
  }
})