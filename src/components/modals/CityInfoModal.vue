<template>
  <div v-if="visible" class="modal">
    <div class="modal-content">
      <span class="close-btn" @click="closeModal">&times;</span>
      <h2 class="modal-content-title">{{ city.name }}</h2>
      <p class="modal-content-degree">
        {{ city.main.temp.toFixed(1) }}
        <span class="modal-content-degree-symbol">
          °C
        </span>
      </p>
      <p>{{ city.weather[0].description }}</p>
      <img :src="'https://openweathermap.org/img/wn/' + city.weather[0].icon + '@2x.png'"
           alt="weather icon"
           class="weather-icon" />
      <div class="modal-content-row">
        <div class="modal-content-row-block">
          <span class="block-title">Feels like:</span>
          <p class="block-text">{{ city.main.feels_like.toFixed(1) }}°C</p>
        </div>
        <div class="modal-content-row-block">
          <span class="block-title">Humidity:</span>
          <p class="block-text">{{ city.main.humidity }}%</p>
        </div>
      </div>
      <div class="modal-content-row">
        <div class="modal-content-row-block">
          <span class="block-title">Pressure:</span>
          <p class="block-text">{{ city.main.pressure }} hPa</p>
        </div>
        <div class="modal-content-row-block">
          <span class="block-title">Wind speed:</span>
          <p class="block-text">{{ city.wind.speed }} m/s</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cityWeatherData: null,
    };
  },
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    city: {
      type: Object,
      required: true
    }
  },
  methods: {
    closeModal() {
      this.$emit('close');
    }
  }
};
</script>

<style scoped lang="scss">
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.7);

  &-content {
    position: relative;
    background-color: #2c3e50;
    padding: 20px;
    border: 1px solid #888;
    width: 30%;
    text-align: center;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    color: #ecf0f1;

    .close-btn {
      position: absolute;
      right: -15px;
      top: -15px;
      padding: 5px 8px;
      border-radius: 25px;
      background: #e74c3c;
      border: none;
      color: #fff;
      font-size: 16px;
      cursor: pointer;
    }

    &-title {
      font-weight: bold;
      font-size: 40px;
    }

    &-degree {
      font-weight: 300;
      font-size: 40px;

      &-symbol {
        font-size: 22px;
      }
    }

    &-row {
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
      padding: 20px 0;

      &-block {
        padding: 25px 30px;
        width: 25%;
        border: none;
        border-radius: 25px;
        background: rgba(0, 0, 0, 0.2);

        .block-title {
          font-weight: bold;
          font-size: 24px;
        }

        .block-text {
          font-size: 18px;
          padding-top: 10px;
        }
      }
    }

    .weather-icon {
      width: 100px;
      height: 100px;
    }
  }
}
</style>
