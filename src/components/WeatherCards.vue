<template>
  <div class="weather-cards">
    <p v-if="weatherData.length >= maxCards">You cannot add more than 5 city cards.</p>
    <div v-else-if="searchCity">
      <button @click="getCity">Send</button>
    </div>
    <div v-if="weatherData.length">
      <div class="card" v-for="(city, index) in weatherData" :key="index">
        <div class="card-header">
          <h3>{{ city.name }}</h3>
          <p class="temp">{{ city.main.temp }}°C</p>
        </div>
        <div class="card-body">
<!--          <img src="cloud_icon_url" alt="weather icon" class="weather-icon" />-->
          <p class="description">{{ city.weather[0].description }}</p>
        </div>
        <div class="card-footer">
          <button @click="deleteCity(index)">Delete</button>
          <button @click="toggleFavorite(index)">
            {{ city.isFavorite ? 'Unfavorite' : 'Favorite' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      weatherData: [],
      apiKey: "9f2b2e8cd60541bbd9ad927b1a5cda93",
      maxCards: 5,
    };
  },
  props: {
    searchCity: {
      type: String,
      required: true,
    },
    initialLocation: {
      type: Object,
      default: null,
    },
  },
  methods: {
    async getCity() {
      if (this.weatherData.length >= this.maxCards) return;
      try {
        const geoResponse = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${this.searchCity}&limit=1&appid=${this.apiKey}`);
        const { lat, lon } = geoResponse.data[0];
        const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${this.apiKey}`);
        const weatherInfo = weatherResponse.data;
        weatherInfo.isFavorite = false;
        this.weatherData.push(weatherInfo);
      } catch (error) {
        console.error(error);
      }
    },
    async getCityByCoords(lat, lon) {
      if (this.weatherData.length >= this.maxCards) return;
      try {
        const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${this.apiKey}`);
        const weatherInfo = weatherResponse.data;
        weatherInfo.isFavorite = false;
        this.weatherData.push(weatherInfo);
      } catch (error) {
        console.error(error);
      }
    },
    deleteCity(index) {
      this.weatherData.splice(index, 1);
    },
    toggleFavorite(index) {
      this.weatherData[index].isFavorite = !this.weatherData[index].isFavorite;
    },
  },
  mounted() {
    if (this.initialLocation) {
      this.getCityByCoords(this.initialLocation.lat, this.initialLocation.lon);
    }
  }
};
</script>

<style scoped lang="scss">
.weather-cards {
  display: flex;
  flex-direction: column;
  align-items: center;

  .card {
    background: #2c3e50;
    border-radius: 10px;
    padding: 16px;
    margin: 8px;
    color: #ecf0f1;
    width: 200px;
    text-align: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      h3 {
        margin: 0;
        font-size: 18px;
      }

      .temp {
        font-size: 24px;
        font-weight: bold;
      }
    }

    .card-body {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 10px 0;

      .weather-icon {
        width: 50px;
        height: 50px;
      }

      .description {
        text-transform: capitalize;
        margin-top: 5px;
      }
    }

    .card-footer {
      display: flex;
      justify-content: space-between;

      button {
        background: #e74c3c;
        border: none;
        color: #fff;
        padding: 5px 10px;
        cursor: pointer;
        border-radius: 5px;

        &:nth-child(2) {
          background: #3498db;
        }
      }
    }
  }
}
</style>