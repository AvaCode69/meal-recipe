<template>
  <aside class="sidebar">
    <h1 class="logo-link">
      <router-link to="/" :exact="false">Find a Meal</router-link>
    </h1>
    <div>
      <div class="accordion-header" @click="toggleAccordion('category')">
        Filter by Category
        <span
          :class="{
            'fas fa-chevron-down': isAccordionOpen === 'category',
            'fas fa-chevron-up': isAccordionOpen !== 'category'
          }"
        ></span>
      </div>
      <div class="accordion-content" v-show="isAccordionOpen === 'category'">
        <category-filter></category-filter>
      </div>
    </div>
    <div>
      <div class="accordion-header" @click="toggleAccordion('area')">
        Filter by Area
        <span
          :class="{
            'fas fa-chevron-down': isAccordionOpen === 'area',
            'fas fa-chevron-up': isAccordionOpen !== 'area'
          }"
        ></span>
      </div>
      <div class="accordion-content" v-show="isAccordionOpen === 'area'">
        <area-filter></area-filter>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import CategoryFilter from '../meals/CategoryFilter.vue'
import AreaFilter from '../meals/AreaFilter.vue'

const isMenuOpen = ref(false)
const isAccordionOpen = ref<string | null>(null)
const router = useRouter()

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

const toggleAccordion = (accordion: string) => {
  isAccordionOpen.value = isAccordionOpen.value === accordion ? null : accordion
}

const navigateAndCloseMenu = (to: string) => {
  router.push(to)
  closeMenu()
}

onMounted(() => {
  document.addEventListener('click', closeMenuOutsideSidebar)
})

const closeMenuOutsideSidebar = (event: MouseEvent) => {
  const sidebar = document.querySelector('.sidebar') as HTMLElement
  const menuToggle = document.querySelector('.menu-toggle') as HTMLElement
  if (
    sidebar &&
    !sidebar.contains(event.target as Node) &&
    !menuToggle.contains(event.target as Node)
  ) {
    closeMenu()
  }
}
</script>

<style scoped>
/* Sidebar styles */
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 250px;
  height: 100%;
  background-color: #3d008d;
  z-index: 100;
  overflow-y: auto;
  transition: transform 0.3s ease-in-out;
}

.show-sidebar {
  transform: translateX(0);
}

.menu-toggle {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.menu-line {
  width: 25px;
  height: 2px;
  background-color: #fff;
  margin-bottom: 5px;
}

.logo-link {
  padding: 1rem;
}

.logo-link a {
  text-decoration: none;
  color: #f7f7f7;
}

.accordion-header {
  color: #fff;
  background-color: #3d008d;
  padding: 1rem;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
}

.accordion-header:hover {
  background-color: #3d008d;
}

.accordion-content {
  padding: 0.5rem;
  background-color: #6a1b9a;
  color: #fff;
  overflow-y: auto;
}

.sidebar::-webkit-scrollbar {
  width: 0 !important;
  background: transparent !important;
}

@media screen and (max-width: 768px) {
  .sidebar {
    width: 250px; /* or any other appropriate value for mobile */
  }
}
</style>
