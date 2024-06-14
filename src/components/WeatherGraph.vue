<template>
  <div class="weather-graph">
    <canvas ref="hourlyTemperatureChart"></canvas>
  </div>
</template>

<script>
import { Chart, LineElement, LineController, CategoryScale, LinearScale, PointElement } from "chart.js";
import axios from "axios";

Chart.register(LineElement, LineController, CategoryScale, LinearScale, PointElement);

export default {
  props: {
    cityWeatherData: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      chart: null,
      apiKey: "9f2b2e8cd60541bbd9ad927b1a5cda93",
    };
  },
  methods: {
    async fetchHourlyWeather(lat, lon) {
      try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${this.apiKey}`
        );
        return response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async updateChart() {
      if (!this.cityWeatherData) return;

      const { lat, lon } = this.cityWeatherData.coord;
      const weatherData = await this.fetchHourlyWeather(lat, lon);

      const hourlyData = weatherData.list.slice(0, 24);
      const labels = hourlyData.map(data => new Date(data.dt * 1000).getHours() + ":00");
      const temperatures = hourlyData.map(data => data.main.temp);

      if (this.chart) {
        this.chart.destroy();
      }

      const ctx = this.$refs.hourlyTemperatureChart.getContext("2d");
      this.chart = new Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [{
            label: "Hourly Temperature (°C)",
            data: temperatures,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          }],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    },
  },
  watch: {
    cityWeatherData: "updateChart",
  },
  mounted() {
    this.updateChart();
  },
};
</script>

<style scoped lang="scss">
.weather-graph {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}
</style>