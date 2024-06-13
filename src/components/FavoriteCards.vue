<<template>
  <div class="weather-cards">
    <div class="weather-cards-item" v-if="favoriteWeatherData.length">
      <div class="card" v-for="(city, index) in favoriteWeatherData" :key="index">
        <button class="close-btn" @click="removeFavorite(index)">✖</button>
        <div class="card-header">
          <h3>{{ city.name }}</h3>
          <p class="temp">{{ city.main.temp }}°C</p>
        </div>
        <div class="card-body">
          <img :src="'https://openweathermap.org/img/wn/' + city.weather[0].icon + '@2x.png'" alt="weather icon" class="weather-icon" />
          <p class="description">{{ city.weather[0].description }}</p>
        </div>
      </div>
    </div>
    <p v-else>No favorite cities added yet.</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      favoriteWeatherData: [],
      maxFavorites: 5,
    };
  },
  methods: {
    removeFavorite(index) {
      this.favoriteWeatherData.splice(index, 1);
      this.saveFavorites();
    },
    toggleFavorite(index) {
      this.favoriteWeatherData[index].isFavorite = !this.favoriteWeatherData[index].isFavorite;
      this.saveFavorites();
    },
    saveFavorites() {
      localStorage.setItem("favoriteCities", JSON.stringify(this.favoriteWeatherData));
    },
    loadFavorites() {
      const favoriteCities = JSON.parse(localStorage.getItem("favoriteCities"));
      if (favoriteCities) {
        this.favoriteWeatherData = favoriteCities;
      }
    },
  },
  mounted() {
    this.loadFavorites();
  },
};
</script>

<style scoped lang="scss">
.weather-cards {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 25px 0;

  &-item {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

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
    }
  }
}
</style>
