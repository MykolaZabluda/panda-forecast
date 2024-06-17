<template>
  <div class="weather-cards">
    <p v-if="weatherData.length >= maxCards">You cannot add more than 5 city cards.</p>
    <div class="weather-cards-item" v-if="weatherData.length">
      <div class="card" v-for="(city, index) in weatherData" :key="index" @click="selectCity(city)">
        <button class="close-btn" @click.stop="showDeleteModal(index)">✖</button>
        <div class="card-header">
          <h3>{{ city.name }}</h3>
          <p class="temp">{{ city.main.temp.toFixed(0) }}°C</p>
        </div>
        <div class="card-body">
          <img :src="'https://openweathermap.org/img/wn/' + city.weather[0].icon + '@2x.png'"
               alt="weather icon"
               class="weather-icon" />
          <p class="description">{{ city.weather[0].description }}</p>
        </div>
        <div class="card-footer">
          <button class="star-btn" @click.stop="toggleFavorite(city)">
            <svg
              v-if="city.isFavorite"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="yellow"
              class="star-icon"
            >
              <path d="M12 2.5l3.09 6.26 6.91 1-5 4.87 1.18 6.88L12 18.27l-6.18 3.25 1.18-6.88-5-4.87 6.91-1L12 2.5z" />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              class="star-icon"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 2.5l3.09 6.26 6.91 1-5 4.87 1.18 6.88L12 18.27l-6.18 3.25 1.18-6.88-5-4.87 6.91-1L12 2.5z"
              />
            </svg>
          </button>
          <button @click="openModal(city)">Open Modal</button>
        </div>
      </div>
    </div>
    <DeleteConfirmationModal
      :visible="showModal"
      @close="closeModal"
      @confirm="confirmDelete"
    />
    <CityInfoModal
      :visible="modalVisible"
      :city="selectedCity"
      @close="closeExtendedModal"
    />
  </div>
</template>

<script>
import axios from "axios";
import DeleteConfirmationModal from "@/components/modals/DeleteConfirmationModal.vue";
import CityInfoModal from "@/components/modals/CityInfoModal.vue";

export default {
  components: {
    DeleteConfirmationModal,
    CityInfoModal,
  },
  data() {
    return {
      weatherData: [],
      apiKey: "9f2b2e8cd60541bbd9ad927b1a5cda93",
      maxCards: 5,
      showModal: false,
      cardIndexToDelete: null,
      modalVisible: false,
      selectedCity: null
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
    async getCityWeather(lat, lon) {
      try {
        const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${this.apiKey}`);
        weatherResponse.data.main.temp = parseFloat(weatherResponse.data.main.temp.toFixed(1));
        weatherResponse.data.isFavorite = false;
        return weatherResponse.data;
      } catch (error) {
        console.error(error);
      }
    },
    setWeatherData(lat, lon) {
      this.getCityWeather(lat, lon).then(weather => {
        this.weatherData.push(weather);
        this.saveFavorites();
        this.$emit("update-graph", weather);
      }).catch(error => console.error(error));
    },
    async getCity() {
      if (this.weatherData.length >= this.maxCards) {
        return;
      }

      const geoResponse = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${this.searchCity}&limit=1&appid=${this.apiKey}`);
      const { lat, lon } = geoResponse.data[0];
      this.setWeatherData(lat, lon);
    },
    getCityByCoords(lat, lon) {
      if (this.weatherData.length >= this.maxCards) {
        return;
      }

      this.setWeatherData(lat, lon);
    },
    showDeleteModal(index) {
      this.cardIndexToDelete = index;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.cardIndexToDelete = null;
    },
    confirmDelete() {
      if (this.cardIndexToDelete !== null) {
        this.weatherData.splice(this.cardIndexToDelete, 1);
        this.saveFavorites();
      }
      this.closeModal();
    },
    toggleFavorite(city) {
      city.isFavorite = !city.isFavorite;
      this.saveFavorites();
    },
    saveFavorites() {
      const favoriteCities = this.weatherData.filter(city => city.isFavorite);
      localStorage.setItem("favoriteCities", JSON.stringify(favoriteCities));
    },
    loadFavorites() {
      const favoriteCities = JSON.parse(localStorage.getItem("favoriteCities")) || [];
      favoriteCities.forEach(favoriteCity => {
        const existingCity = this.weatherData.find(city => city.id === favoriteCity.id);

        if (existingCity) {
          existingCity.isFavorite = true;
        } else {
          this.weatherData.push(favoriteCity);
        }
      });
    },
    selectCity(city) {
      this.$emit("update-graph", city);
    },
    openModal(city) {
      this.selectedCity = city;
      this.modalVisible = true;
    },
    closeExtendedModal() {
      this.modalVisible = false;
      this.selectedCity = null;
    }
  },
  mounted() {
    if (this.initialLocation) {
      this.getCityByCoords(this.initialLocation.lat, this.initialLocation.lon);
    }
    this.loadFavorites();
  },
};
</script>

<style scoped lang="scss">
.weather-cards {
  display: flex;
  flex-direction: column;
  align-items: center;

  &-item {
    display: flex;

    .card {
      background: #2c3e50;
      border-radius: 10px;
      padding: 16px;
      margin: 8px;
      color: #ecf0f1;
      width: 200px;
      text-align: center;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      position: relative;

      .close-btn {
        position: absolute;
        top: -15px;
        right: -15px;
        padding: 5px 8px;
        border-radius: 25px;
        background: #e74c3c;
        border: none;
        color: #fff;
        font-size: 16px;
        cursor: pointer;
      }

      &-header {
        display: flex;
        flex-direction: column;
        text-align: left;

        h3 {
          margin: 0;
          font-size: 32px;
          font-weight: bold;
        }

        .temp {
          font-size: 28px;
          font-weight: bold;
        }
      }

      &-body {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 10px 0;

        .weather-icon {
          width: 75px;
          height: 75px;
        }

        .description {
          text-transform: capitalize;
          margin-top: 5px;
        }
      }

      .card-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 0;

        button {
          background: #3498db;
          padding: 10px 5px;
          border: none;
          border-radius: 15px;
          font-size: 14px;
          font-weight: 600;
        }

        .star-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;

          .star-icon {
            width: 33px;
            height: 33px;
          }
        }
      }
    }
  }
}
</style>