<!--MealsItem.vue-->
<template>
  <li class="item">
    <router-link :to="mealDetailsLink">
      <div class="image-container">
        <img :src="meal.strMealThumb" :alt="meal.strMeal" />
      </div>
      <p>{{ meal.strMeal }}</p>
    </router-link>
  </li>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'

const { meal } = defineProps(['meal'])

const mealDetailsLink = computed(() => `/recipe/${meal.idMeal}`)
</script>

<style scoped>
.item {
  box-sizing: border-box;
  text-align: center;
}
.content {
  display: flex;
  flex-direction: column;
}

.image-container img {
  width: 76%;
  height: auto;
  object-fit: cover;
  border-radius: 8px;
}

p {
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

a {
  text-decoration: none !important;
  color: #686767;
}
.router-link {
  padding: 0.5rem 1rem;
  background-color: #4caf50;
  color: white;
  text-decoration: none;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

.router-link:hover {
  background-color: #45a049;
}

/* Responsive Styles */
@media screen and (max-width: 768px) {
  .item {
    width: 48%;
  }
}

@media screen and (max-width: 480px) {
  .item {
    width: 100%;
  }
}
</style>
