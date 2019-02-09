import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('access_token') || null,
    domain_dev: 'http://localhost:8080',
    domain: 'http://direct24.com.pl',
    api: 'http://api.direct24.com.pl/api',
    cart: localStorage.getItem('cart') !== '' ? JSON.parse(localStorage.getItem('cart')) : []
  },
  getters: {
      loggedIn(state) {
        return state.token !== null;
      },
      cartcount(state) {
        return state.cart.length;
      },
      cartvalue(state) {
        let sum = 0;
        for( let i = 0; i < state.cart.length; i++ )
        {
          let product = JSON.parse(state.cart[i])
          sum = sum + parseFloat(product.item.price) * parseFloat(product.quantity)
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
    addToCart(state, data) {
      let json_data = JSON.stringify(data.product);
      state.cart.push( json_data );
      localStorage.setItem('cart', JSON.stringify(state.cart) );
    },
    removeFromCart(state, data) {
      state.cart.splice(data.index,1);
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    clearCart(state) {
      state.cart = [];
      localStorage.setItem('cart', state.cart);
    }
  },
  actions: {
      removeFromCart(context, data) {
        context.commit('removeFromCart',data);
      },
      clearCart(context) {
        context.commit('clearCart');
      },
      addToCart(context, data) {
        context.commit('addToCart', data);
      },
      destroyToken(context) {
        if( context.getters.loggedIn)
        {
          return new Promise((resolve, reject) => {
            Axios.post(`${this.state.api}/users/logout`)
            .then(response => {
              localStorage.removeItem('access_token');
              context.commit('destroyToken');
              resolve(response);
            })
            .catch(error => {
              localStorage.removeItem('access_token');
              context.commit('destroyToken');
              reject(error);
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
