<template>
  <div class="layout-container">
    <div :class="{ sidebar: true, 'show-menu': isMenuOpen }">
      <SideBar />
    </div>
    <div class="container">
      <div :class="['menu-toggle', { 'no-background': !isMenuOpen }]" @click="toggleMenu">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <TheHeader />
      <router-view v-slot="slotProps">
        <transition name="route" mode="out-in">
          <component :is="slotProps.Component"></component>
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script setup>
import SideBar from '@/components/layout/SideBar.vue'
import TheHeader from '@/components/layout/TheHeader.vue'
import { ref, onMounted, onUnmounted } from 'vue'

const isMenuOpen = ref(true)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
const handleOutsideClick = (event) => {
  if (!isMenuOpen.value && !event.target.closest('.sidebar')) {
    isMenuOpen.value = true
  }
}

onMounted(() => {
  document.body.addEventListener('mousedown', handleOutsideClick)
})

onUnmounted(() => {
  document.body.removeEventListener('mousedown', handleOutsideClick)
})
</script>

<style scoped>
.layout-container {
  display: flex;
}

.sidebar {
  flex: 0 0 15%;
}

.container {
  flex: 0 0 84%;
  position: relative;
}

.menu-toggle {
  display: none;
  flex-direction: column;
  cursor: pointer;
  justify-content: flex-end;
}

.menu-toggle span {
  display: block;
  width: 25px;
  height: 3px;
  background-color: #f391e3;
  margin: 3px 0;
}

.menu-toggle.no-background {
  background: none;
}

@media only screen and (max-width: 768px) {
  .layout-container {
    display: block;
  }
  .sidebar {
    flex: 0 0 17%;
  }
  .show-menu {
    display: none;
  }
  .container {
    flex: 0 0 80%;
  }

  .menu-toggle {
    display: flex;
    background: #3d008d;
    padding: 1rem;
  }
}

@media only screen and (max-width: 1360px) {
  .sidebar {
    flex: 0 0 23%;
  }
}
</style>
