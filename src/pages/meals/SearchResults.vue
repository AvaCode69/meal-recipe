<!-- SearchResults.vue -->
<template>
  <main>
    <base-spinner v-if="mealStore.isLoading"></base-spinner>
    <base-card>
      <div v-if="mealStore.error">{{ mealStore.error }}</div>

      <ul v-else-if="!mealStore.isLoading && !mealStore.error" class="meal-item">
        <meals-item v-for="meal in localMeals" :key="meal.idMeal" :meal="meal"></meals-item>
      </ul>
    </base-card>
  </main>
</template>

<script setup lang="ts">
import { useMealStore } from '@/stores/mealStore'
import MealsItem from '@/components/meals/MealsItem.vue'
import { Ref, computed, onMounted } from 'vue'
import { Meal } from '../../types/types'
import { useRoute } from 'vue-router'

const mealStore = useMealStore()

const localMeals: Ref<Meal[]> = computed(() => [...mealStore.searchResults])

const route = useRoute()

onMounted(() => {
  const query = route.query.q as string
  const searchType = route.name === 'SearchByIngredient' ? 'ingredient' : 'meal'
  if (query && searchType) {
    mealStore.SearchResultByEnter(query, searchType)
  }
})
</script>

<style scoped>
.meal-item {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  list-style-type: none;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}

.filters-container {
  display: inline-block;
  margin-left: 10rem;
}

.filter-area {
  padding: 1rem;
  margin: 2rem auto;
  max-width: 90rem;
  text-align: center;
}

@media screen and (max-width: 768px) {
  .filters-container {
    flex-direction: column;
    align-items: center;
  }
  .meal-item {
    grid-template-columns: repeat(2, 1fr);
  }
  .image-container img {
    width: 100%;
  }
}

@media screen and (max-width: 480px) {
  .filter-area {
    padding: 0.5rem;
    margin: 1rem auto;
  }
}
</style>
../../types/types
