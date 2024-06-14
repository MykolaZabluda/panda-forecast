<template>
  <div class="weather-block">
    <div class="weather-block-input">
      <input v-model="searchCity"
        @keyup.enter="sendRequest"
        placeholder="Enter city name"
      />
    </div>
    <WeatherCards ref="weatherCards" :searchCity="searchCity" :initialLocation="initialLocation" @update-graph="updateGraphData" />
    <WeatherGraph :cityWeatherData="cityWeatherData" />
  </div>
</template>

<script>
import WeatherCards from "@/components/WeatherCards.vue";
import WeatherGraph from "@/components/WeatherGraph.vue";

export default {
  components: {
    WeatherCards,
    WeatherGraph,
  },
  data() {
    return {
      searchCity: "",
      initialLocation: null,
      cityWeatherData: null,
    };
  },
  methods: {
    sendRequest() {
      this.$refs.weatherCards.getCity();
      this.searchCity = "";
    },
    getCurrentLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
              this.initialLocation = {
                lat: position.coords.latitude,
                lon: position.coords.longitude,
              };
              this.$refs.weatherCards.getCityByCoords(this.initialLocation.lat, this.initialLocation.lon);
            },
            (error) => {
              console.error(error);
            }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    },
    updateGraphData(weatherData) {
      this.cityWeatherData = weatherData;
    },
  },
  mounted() {
    this.getCurrentLocation();
  },
};
</script>

<style scoped lang="scss">
.weather-block {
  padding: 16px;
  max-width: 1200px;
  margin: 0 auto;

  &-input {
    margin-bottom: 16px;

    input {
      width: 100%;
      padding: 8px;
      font-size: 16px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
  }
}
</style>