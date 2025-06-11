<template>
  <div class="map-container">
    <div ref="map" style="width: 100%; height: 500px"></div>
    <div class="controls">
      <input
        v-model="startPoint"
        placeholder="Начальная точка (широта,долгота)"
      >
      <input
        v-model="endPoint"
        placeholder="Конечная точка (широта,долгота)"
      >
      <button @click="drawNewRoute">Построить маршрут</button>
    </div>
  </div>
</template>

<script>
/* global ymaps */
import axios from 'axios'

export default {
  data() {
    return {
      map: null,
      startPoint: '',
      endPoint: '',
      multiRoute: null
    }
  },
  methods: {
    async loadYandexMap() {
      if (!window.ymaps) {
        await new Promise((resolve) => {
          const script = document.createElement('script')
          script.src = 'https://api-maps.yandex.ru/2.1/?apikey=7cc9191a-520e-472f-a3d1-9d7e57f69d5b&lang=ru_RU'
          document.head.appendChild(script)
          script.onload = resolve
        })
      }
      await ymaps.ready()
      this.initMap()
    },

    initMap() {
      this.map = new ymaps.Map(this.$refs.map, {
        center: [45.03547, 38.97531],
        zoom: 13
      })
    },

    calculateDistance(startCoords, endCoords) {
      const R = 6371
      const dLat = this.deg2rad(endCoords[0] - startCoords[0])
      const dLon = this.deg2rad(endCoords[1] - startCoords[1])
      const a =
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(this.deg2rad(startCoords[0])) *
        Math.cos(this.deg2rad(endCoords[0])) *
        Math.sin(dLon/2) * Math.sin(dLon/2)
      return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    },

    deg2rad(deg) {
      return deg * (Math.PI/180)
    },

    async drawNewRoute() {
      if (!this.startPoint || !this.endPoint) {
        alert('Заполните оба поля!')
        return
      }

      let start, end
      try {
        start = this.startPoint.split(',').map(Number)
        end = this.endPoint.split(',').map(Number)
      } catch (e) {
        alert('Ошибка формата координат! Пример: 45.03547,38.97531')
        return
      }

      if (this.map) {
        this.map.geoObjects.removeAll()
        this.multiRoute = new ymaps.multiRouter.MultiRoute(
          {
            referencePoints: [start, end],
            params: { results: 3 }
          },
          { boundsAutoApply: true }
        )
        this.map.geoObjects.add(this.multiRoute)
      }

      try {
        const response = await axios.post('http://localhost:5000/api/routes', {
          start: this.startPoint,
          end: this.endPoint,
          distance: this.calculateDistance(start, end)
        })
        if (response.status === 201) {
          this.$emit('route-saved')
        }
      } catch (error) {
        console.error('Ошибка сохранения:', error)
      }
    },

    setRoute(startCoords, endCoords) {
      this.startPoint = `${startCoords[0]},${startCoords[1]}`
      this.endPoint = `${endCoords[0]},${endCoords[1]}`
      this.drawNewRoute()
    }
  },
  mounted() {
    this.loadYandexMap()
  }
}
</script>

<style scoped>
.map-container {
  margin: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
}

.controls {
  padding: 15px;
  background: #f8f9fa;
  display: flex;
  gap: 10px;
}

input {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  flex-grow: 1;
}

button {
  padding: 8px 15px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #0056b3;
}
</style>
