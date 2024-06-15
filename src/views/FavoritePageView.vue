<template>
  <div class="wrapper">
    <Header />
    <FavoriteCards />
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import FavoriteCards from "@/components/FavoriteCards.vue";
import Footer from "@/components/Footer.vue";

export default {
  components: {
    Footer,
    FavoriteCards,
    Header,
  }
}
</script>

<style scoped lang="scss">
.wrapper {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  justify-content: space-between;
}
</style>