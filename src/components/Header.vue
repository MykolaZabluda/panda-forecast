<template>
  <header class="header">
    <p class="header-title">Panda Forecast</p>
  </header>
  <nav>
    <router-link class="links" to="/">All</router-link> |
    <router-link class="links" to="/favorite">Favorite</router-link>
  </nav>
</template>

<script setup>
</script>

<style scoped lang="scss">
.header {
  height: auto;
  padding: 25px 30px;
  background: #2c3e50;

  &-title {
    font-family: 'Open-sans', sans-serif;
    font-size: 18px;
    font-weight: 800;
    text-align: left;
    color: #fff;
  }
}

nav {
  background: #2c3e50;
  color: #fff;

  a {
    color: #fff;

    &.router-link-exact-active {
      color: #e74c3c;
    }
  }
}
</style>