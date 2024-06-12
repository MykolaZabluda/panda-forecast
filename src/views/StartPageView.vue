<template>
  <div class="wrapper">
    <Header />
    <WeatherBlock />
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import WeatherBlock from "@/components/WeatherBlock.vue";
import Footer from "@/components/Footer.vue";

export default {
  components: {
    Footer,
    WeatherBlock,
    Header,
  }
}
</script>

<style scoped lang="scss"></style>