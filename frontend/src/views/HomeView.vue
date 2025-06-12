<template>
  <div class="home-container" :data-theme="currentTheme">
    <!-- Хедер с навигацией -->
    <header class="header">
      <router-link to="/" class="logo-link">
        <img
          src="@/assets/logo/лого.svg"
          alt="EcoRide Logo"
          class="logo"
          @error="handleLogoError"
        >
      </router-link>

      <nav class="nav">
        <router-link
          v-for="link in navLinks"
          :key="link.path"
          :to="link.path"
          class="nav-link"
        >
          {{ link.name }}
        </router-link>
      </nav>

      <div class="controls">
        <ThemeToggle />
        <AuthButton class="auth-button" />
      </div>
    </header>

    <!-- Основной контент -->
    <main class="main-content">
      <section class="hero">
        <div class="hero-content">
          <h1 class="hero-title">
            <span class="title-part">Умные маршруты</span>
            <span class="highlight">для вашего велосипеда</span>
          </h1>

          <div class="cta-section">
            <AuthButton size="large" />
            <p class="cta-subtext">Или <router-link to="/map">продолжить как гость</router-link></p>
          </div>
        </div>

        <div class="hero-visual">
          <div class="background-overlay"></div>
        </div>
      </section>
    </main>

    <AuthModal v-if="showAuthModal" @close="showAuthModal = false" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ThemeToggle from '@/components/ThemeToggle.vue'
import AuthButton from '@/components/Auth/AuthButton.vue'
import AuthModal from '@/components/Auth/AuthModal.vue'

export default {
  name: 'HomeView',
  components: {
    ThemeToggle,
    AuthButton,
    AuthModal
  },
  data() {
    return {
      navLinks: [
        { name: 'Карта', path: '/map' },
        { name: 'Маршруты', path: '/routes' },
        { name: 'Сообщество', path: '/community' }
      ],
      showAuthModal: false,
      logoError: false
    }
  },
  computed: {
    ...mapState('theme', ['isDark']),
    currentTheme() {
      return this.isDark ? 'dark' : 'light'
    }
  },
  methods: {
    handleLogoError() {
      this.logoError = true
      console.error('Ошибка загрузки логотипа')
    }
  }
}
</script>

<style scoped>
.home-container {
  --color-bg: #ffffff;
  --color-text: #2d3748;
  --color-primary: #2E5E4E;
  --color-secondary: #3AB09E;
  --color-header-bg: rgba(255, 255, 255, 0.95);
  --color-shadow: rgba(0, 0, 0, 0.1);
  --hero-bg-image: url('@/assets/background/задний фон.jpeg');

  min-height: 100vh;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.home-container[data-theme="dark"] {
  --color-bg: #1a202c;
  --color-text: #e2e8f0;
  --color-primary: #48bb78;
  --color-secondary: #81e6d9;
  --color-header-bg: rgba(26, 32, 44, 0.98);
  --color-shadow: rgba(255, 255, 255, 0.1);
  --hero-bg-image: linear-gradient(
    rgba(0, 0, 0, 0.6),
    rgba(0, 0, 0, 0.6)
  ), url('@/assets/background/задний фон.jpeg');
}

/* Хедер */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 5%;
  background: var(--color-header-bg);
  backdrop-filter: blur(10px);
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 15px var(--color-shadow);
}

.logo {
  height: 45px;
  transition: transform 0.3s ease;
}

.logo:hover {
  transform: scale(1.05);
}

/* Навигация */
.nav {
  display: flex;
  gap: 2rem;
  margin-left: auto;
  margin-right: 2rem;
}

.nav-link {
  color: var(--color-text);
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.2s ease;
  position: relative;
}

.nav-link:hover {
  color: var(--color-primary);
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -3px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--color-secondary);
  transition: width 0.3s ease;
}

.nav-link:hover::after {
  width: 100%;
}

/* Основной контент */
.main-content {
  margin-top: 80px;
  padding: 4rem 5%;
}

.hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  min-height: calc(100vh - 160px);
}

.hero-content {
  position: relative;
  z-index: 10;
}

.hero-title {
  font-size: 2.8rem;
  line-height: 1.3;
  margin-bottom: 2rem;
  color: var(--color-primary);
}

.title-part {
  display: block;
}

.highlight {
  color: var(--color-secondary);
}

.cta-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 400px;
}

.cta-subtext {
  color: var(--color-text);
  opacity: 0.8;
}

.hero-visual {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  min-height: 500px;
  background: var(--hero-bg-image);
  background-size: cover;
  background-position: center;
}

.background-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--hero-bg-overlay);
}

/* Адаптивность */
@media (max-width: 1024px) {
  .hero {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .nav {
    display: none;
  }

  .controls {
    margin-left: auto;
  }

  .hero-title {
    font-size: 2.2rem;
  }

  .hero-visual {
    min-height: 300px;
  }
}

@media (max-width: 768px) {
  .header {
    padding: 1rem;
  }

  .logo {
    height: 35px;
  }
}
</style>
