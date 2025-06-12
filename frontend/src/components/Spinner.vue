<template>
  <div class="spinner" :style="{ width: size, height: size }">
    <svg viewBox="0 0 50 50">
      <circle
        class="path"
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke-width="5"
        :stroke="color"
      />
    </svg>
  </div>
</template>

<script>
export default {
  name: 'AppSpinner',
  props: {
    size: {
      type: String,
      default: '40px'
    },
    color: {
      type: String,
      default: 'var(--primary-color)'
    }
  }
}
</script>

<style scoped>
.spinner {
  animation: rotate 2s linear infinite;
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

.path {
  stroke-linecap: round;
  animation: dash 1.5s ease-in-out infinite;
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
}
</style>
