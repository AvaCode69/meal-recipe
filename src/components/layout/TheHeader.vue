<template>
  <header>
    <nav>
      <section class="filters-container">
        <meal-search></meal-search>
      </section>
    </nav>
  </header>
</template>

<script setup lang="ts">
import MealSearch from '@/components/meals/MealSearch.vue'
</script>

<style scoped>
/* Sidebar styles */

.filters-container {
  display: flex;
  align-items: center;
}

@media screen and (max-width: 768px) {
  nav {
    width: 100%;
  }
}
</style>
