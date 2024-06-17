<template>
  <header class="header">
    <div class="header-wrapper">
      <p class="header-title">Panda Forecast</p>
      <nav>
        <router-link class="links" to="/">All</router-link> |
        <router-link class="links" to="/favorite">Favorite</router-link>
      </nav>
    </div>
  </header>
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
  padding: 30px;
  background: #2c3e50;
  color: #fff;

  a {
    color: #fff;
    font-size: 18px;

    &.router-link-exact-active {
      color: #e74c3c;
    }
  }
}
</style>