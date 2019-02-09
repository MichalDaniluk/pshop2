<template>
  <div id="app">

    <nav id="topnav" class="navbar navbar-expand-lg navbar-light bg-light flex-md-nowrap p-0 shadow" style="height:80px">
      <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="/"><i class="fas fa-building"></i> </a>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
          <a v-if="this.$store.getters.loggedIn" class="nav-item nav-link" href="/logout"><i class="fas fa-user"></i> Wyloguj</a>
          <a v-else class="nav-item nav-link" href="/login"><i class="fas fa-user"></i> Zaloguj</a>
          <a class="nav-item nav-link" href="/cart"><i class="fas fa-shopping-cart"></i> Koszyk (ilość: {{ this.$store.getters.cartcount }}, wartość: {{ this.$store.getters.cartvalue }} zł)</a>
          </div>
          <form class="form-inline">
              <input class="form-control mr-sm-2" type="search" placeholder="Szukaj" aria-label="Szukaj">
              <button class="btn btn-outline-success my-2 my-sm-0" type="submit"><i class="fas fa-search"></i> Szukaj</button>
          </form>
  </div>
  </nav>

<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
    <a class="navbar-brand" href="#">direct24.com.pl</a>
    <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
      <li class="nav-item">
        <a class="nav-link" href="/">Start</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/login">Zaloguj</a>
      </li>
      <li class="nav-item" v-if="this.$store.getters.loggedIn">
        <a class="nav-link" href="/logout">Wyloguj</a>
      </li>
      <li>
        <a class="nav-item nav-link" href="/cart"><i class="fas fa-shopping-cart"></i> Koszyk (ilość: {{ this.$store.getters.cartcount }}, wartość: {{ this.$store.getters.cartvalue }} zł)</a>
      </li>
    </ul>
    <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="search" placeholder="Szukaj" aria-label="Search">
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Szukaj</button>
    </form>
  </div>
</nav>


    <router-view/>
  </div>
</template>

<script>
export default {
  computed: {

  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
