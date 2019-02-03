<template>
  <div id="app">
    <nav id="topnav" class="navbar navbar-expand-lg navbar-light bg-light flex-md-nowrap p-0 shadow" style="height:80px">
      <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="/"><i class="fas fa-building"></i> direct24.com.pl</a>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
          <a class="nav-item nav-link" href="/logout"><i class="fas fa-user"></i> Wyloguj</a>
          <a class="nav-item nav-link" href="/login"><i class="fas fa-user"></i> Zaloguj</a>
          <a class="nav-item nav-link" href="/cart"><i class="fas fa-shopping-cart"></i> Koszyk (ilość: {{ this.$store.state.cart.count }}, wartość:  zł)</a>
          </div>
          <form class="form-inline">
              <input class="form-control mr-sm-2" type="search" placeholder="Szukaj" aria-label="Szukaj">
              <button class="btn btn-outline-success my-2 my-sm-0" type="submit"><i class="fas fa-search"></i> Szukaj</button>
          </form>
  </div>

        </nav>
    <router-view/>
  </div>
</template>

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
