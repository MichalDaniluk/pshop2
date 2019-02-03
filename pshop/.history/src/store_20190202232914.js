import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('access_token') || null,
    domain: 'http://localhost:8080',
    api: 'http://api.direct24.com.pl/api',
    cart: {
      count: this.items.length,
      value: 0,
      items:[]
    }
  },
  getters: {
      loggedIn(state) {
        return state.token !== null
      }
  },
  mutations: {
    retriveToken(state, token) {
      state.token = token
    },
    destroyToken(state) {
      state.token = null
    }
  },
  actions: {
      destroyToken(context) {
        if( context.getters.loggedIn)
        {
          return new Promise((resolve, reject) => {
            Axios.post(`${this.state.api}/users/logout`)
            .then(response => {
              localStorage.removeItem('access_token')
              context.commit('destroyToken')
              resolve(response)
            })
            .catch(error => {
              localStorage.removeItem('access_token')
              context.commit('destroyToken')
              reject(error)
            })
          })
        }
      },
      retriveToken(context, credentials) {
        return new Promise((resolve, reject) => {
        Axios.post(`${this.state.api}/users/login`, {
          username: credentials.username,
          password:credentials.password
        })
        .then(response => {
          const token = response.data.token
          localStorage.setItem('access_token', token)
          context.commit('retriveToken', token)
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
      })
    }

  }
})
