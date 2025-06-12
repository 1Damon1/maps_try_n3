<template>
 <div id="app" :data-theme="$store.state.theme">
 <header class="app-header">
 <router-link to="/" class="logo">
 <img src="@/assets/logo/лого.svg" alt="Логотип">
 </router-link>
 <nav>
 <router-link to="/">Главная</router-link>
 <router-link to="/map">Карта</router-link>
 <router-link to="/saved">История поездок</router-link>
 </nav>
 <ThemeToggle />
 </header>

 <router-view/>
 </div>
</template>

<script>
import ThemeToggle from '@/components/ThemeToggle.vue'

export default {
 components: { ThemeToggle },
 mounted() {
 this.updateTheme()
 },
 watch: {
 '$store.state.theme': 'updateTheme'
 },
 methods: {
 updateTheme() {
 const theme = this.$store.state.theme
 document.documentElement.setAttribute('data-theme', theme)
 }
 }
}
</script>

<style>
.app-header {
 padding: 1rem 2rem;
 display: grid;
 grid-template-columns: auto 1fr auto;
 align-items: center;
 gap: 2rem;
 background: var(--header-bg);
 box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.logo img {
 height: 40px;
}

nav {
 display: flex;
 gap: 1.5rem;
}

nav a {
 color: var(--nav-link);
 text-decoration: none;
 font-weight: 500;
 transition: color 0.2s;
}

nav a.router-link-exact-active {
 color: var(--primary-color);
}
</style>
