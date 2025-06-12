<template>
  <div class="map-container">
    <div class="map-wrapper">
      <div ref="map" class="yandex-map"></div>
    </div>

    <div class="route-panel">
      <div class="input-group">
        <input
          v-model="startQuery"
          type="text"
          placeholder="Откуда"
          @keyup.enter="geocodeStart"
        >
        <button
          class="geocode-btn"
          @click="geocodeStart"
          :disabled="!startQuery"
        >
          🎯
        </button>
      </div>

      <div class="input-group">
        <input
          v-model="endQuery"
          type="text"
          placeholder="Куда"
          @keyup.enter="geocodeEnd"
        >
        <button
          class="geocode-btn"
          @click="geocodeEnd"
          :disabled="!endQuery"
        >
          🎯
        </button>
      </div>

      <button
        class="build-route-btn"
        @click="buildRoute"
        :disabled="!isReadyToBuild"
      >
        <AppSpinner v-if="isBuilding" size="20px" />
        <span v-else>{{ routeInfo ? 'Обновить маршрут' : 'Построить маршрут' }}</span>
      </button>

      <div class="route-history" v-if="recentRoutes.length > 0">
        <h4>Последние маршруты:</h4>
        <div
          v-for="(route, index) in recentRoutes"
          :key="index"
          class="history-item"
        >
          <div class="route-summary">
            <span class="route-from">📍 {{ route.start }}</span>
            <span class="route-arrow">→</span>
            <span class="route-to">🏁 {{ route.end }}</span>
          </div>
          <div class="history-item-actions">
            <button
              class="apply-route-btn"
              @click="applyRoute(route)"
            >
              Применить
            </button>
            <button
              class="delete-history-btn"
              @click="deleteHistoryRoute(index)"
            >
              ×
            </button>
          </div>
        </div>
      </div>

      <div v-if="routeInfo" class="route-details">
        <div class="route-stats">
          <div class="stat-item">
            <span class="stat-label">Расстояние:</span>
            <span class="stat-value">{{ routeInfo.distance }} км</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Время:</span>
            <span class="stat-value">{{ routeInfo.duration }} мин</span>
          </div>
        </div>

        <button
          @click="saveRoute"
          class="save-route-btn"
          :disabled="!routeInfo"
        >
          💾 Сохранить маршрут
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import AppSpinner from './Spinner.vue'
import { ymapLoader } from 'vue-yandex-maps'

export default {
  components: {
    AppSpinner
  },
  data() {
    return {
      startQuery: '',
      endQuery: '',
      startCoords: null,
      endCoords: null,
      map: null,
      route: null,
      isBuilding: false,
      routeInfo: null
    }
  },
  computed: {
    recentRoutes() {
      return this.$store.getters.sortedRoutes.slice(0, 3)
    },
    isReadyToBuild() {
      return this.startCoords && this.endCoords && !this.isBuilding
    }
  },
  async mounted() {
    await this.initializeMap()
  },
  methods: {
    async initializeMap() {
      const ymaps = await ymapLoader.load('https://api-maps.yandex.ru/2.1/', {
        apiKey: process.env.VUE_APP_YMAPS_KEY,
        lang: 'ru_RU'
      })

      this.map = new ymaps.Map(this.$refs.map, {
        center: [45.0448, 38.976],
        zoom: 10,
        controls: ['zoomControl']
      })
    },

    async geocode(query) {
      const ymaps = await ymapLoader.get()
      return new Promise((resolve) => {
        ymaps.geocode(query, { results: 1 }).then((res) => {
          const firstGeoObject = res.geoObjects.get(0)
          resolve(firstGeoObject ? firstGeoObject.geometry.getCoordinates() : null)
        })
      })
    },

    async geocodeStart() {
      this.startCoords = await this.geocode(this.startQuery)
      if (!this.startCoords) alert('Адрес отправки не найден')
    },

    async geocodeEnd() {
      this.endCoords = await this.geocode(this.endQuery)
      if (!this.endCoords) alert('Адрес назначения не найден')
    },

    async buildRoute() {
      if (!this.startCoords || !this.endCoords) return

      this.isBuilding = true
      const ymaps = await ymapLoader.get()

      if (this.route) {
        this.map.geoObjects.remove(this.route)
      }

      this.route = new ymaps.multiRouter.MultiRoute({
        referencePoints: [
          this.startCoords,
          this.endCoords
        ],
        params: {
          routingMode: 'auto'
        }
      }, {
        boundsAutoApply: true,
        wayPointStartIconColor: '#3b82f6',
        wayPointFinishIconColor: '#ef4444'
      })

      this.map.geoObjects.add(this.route)

      this.route.model.events.add('requestsuccess', () => {
        const activeRoute = this.route.getActiveRoute()
        this.routeInfo = {
          distance: activeRoute.properties.get('distance').text,
          duration: activeRoute.properties.get('duration').text
        }
        this.isBuilding = false
      })
    },

    applyRoute(route) {
      this.startQuery = route.start
      this.endQuery = route.end
      this.startCoords = route.startCoords
      this.endCoords = route.endCoords
      this.buildRoute()
    },

    saveRoute() {
      this.$store.dispatch('saveRoute', {
        start: this.startQuery,
        end: this.endQuery,
        startCoords: this.startCoords,
        endCoords: this.endCoords,
        ...this.routeInfo,
        date: new Date().toISOString()
      })
      alert('Маршрут успешно сохранен!')
    },

    deleteHistoryRoute(index) {
      this.$store.dispatch('deleteRoute', index)
    }
  }
}
</script>

<style scoped>
.map-container {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  height: calc(100vh - 80px);
  padding: 1rem;
}

.map-wrapper {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.yandex-map {
  height: 100%;
  width: 100%;
}

.route-panel {
  background: var(--card-bg);
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid var(--border-color);
}

.input-group {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

input {
  flex: 1;
  padding: 0.8rem;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background: var(--input-bg);
  color: var(--text-color);
}

.geocode-btn {
  padding: 0 1rem;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.build-route-btn {
  width: 100%;
  padding: 1rem;
  margin: 1rem 0;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.route-history {
  margin-top: 2rem;
  padding: 1rem;
  background: var(--history-bg);
  border-radius: 8px;
}

.history-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem;
  margin: 0.5rem 0;
  background: var(--history-item-bg);
  border-radius: 6px;
}

.history-item-actions {
  display: flex;
  gap: 0.5rem;
}

.apply-route-btn {
  padding: 0.4rem 0.8rem;
  background: var(--primary-color);
  color: var(--button-text);
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.delete-history-btn {
  padding: 0 0.4rem;
  background: var(--error-color);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.route-details {
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border-color);
}

.route-stats {
  display: grid;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.stat-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stat-label {
  opacity: 0.8;
}

.stat-value {
  font-weight: 600;
}

.save-route-btn {
  width: 100%;
  padding: 1rem;
  background: var(--success-color);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: opacity 0.2s;
}

.save-route-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
