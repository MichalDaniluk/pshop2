import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('access_token') || null,
    domain: 'http://localhost:8080',
    api: 'http://api.direct24.com.pl/api',
    card: {
      items:[]
    }
  },
  getters: {
      loggedIn(state) {
        return state.token !== null
      },
      cartcount(state) {
        return state.card.items.length
      },
      cartvalue(state) {
        let sum = 0;

        for(let i=0; i<state.card.items;i++) {
          sum = sum + Object.values(state.card.items[i][0].price);
        }
        return sum;
      }
  },
  mutations: {
    retriveToken(state, token) {
      state.token = token
    },
    destroyToken(state) {
      state.token = null
    },
    addToCard(state, data) {
      state.card.items.push( [data.element, data.count] )
    }
  },
  actions: {
      addToCard(context, data) {
        context.commit('addToCard', data);
      },
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
