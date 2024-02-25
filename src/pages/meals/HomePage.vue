<template>
  <main>
    <h2>{{ route.params.pageTitle }} {{ dynamicSegment }}</h2>
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
import { onMounted, ref, watch, defineProps } from 'vue'
import { type Meal } from '@/types/types'
import BaseRouteHead from '@/components/ui/BaseRouteHead'
import { useRoute } from 'vue-router'

const mealStore = useMealStore()
const props = defineProps(['dynamicSegment'])
const localMeals = ref<Meal[]>([])
const route = useRoute()
BaseRouteHead(props)

onMounted(() => {
  loadMeals()
})

watch(
  () => [route.params.catName, route.params.areaName],
  ([newCategory, newArea], [oldCategory, oldArea]) => {
    if (newCategory !== oldCategory || newArea !== oldArea) {
      loadMeals()
    }
  }
)

async function loadMeals() {
  if (route.params.catName) {
    await mealStore.getMealsByCategory(route.params.catName)
  } else if (route.params.areaName) {
    await mealStore.getMealsByArea(route.params.areaName)
  } else {
    await mealStore.loadMeals()
  }
  localMeals.value = [...mealStore.mealsData]
}
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
main {
  padding: 0.7rem;
}

@media screen and (max-width: 768px) {
  .filters-container {
    flex-direction: column;
    align-items: center;
  }
  .meal-item {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (max-width: 480px) {
  .filter-area {
    padding: 0.5rem;
    margin: 1rem auto;
  }
}
</style>
@/types/types
