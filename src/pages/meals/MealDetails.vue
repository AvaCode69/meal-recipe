<!-- MealDetails.vue -->

<template>
  <main>
    <base-card>
      <div v-if="localMeals" class="meal-info">
        <div class="image-container">
          <h3>{{ localMeals.strMeal }}</h3>
          <img :src="localMeals.strMealThumb" :alt="localMeals.strMeal" />
        </div>
        <meal-ingredient :local-meals="localMeals"></meal-ingredient>
      </div>
      <meal-instructions :local-meals="localMeals"></meal-instructions>
      <video-player :local-meals="localMeals"></video-player>
    </base-card>
  </main>
</template>

<script setup lang="ts">
import { useMealStore } from '@/stores/mealStore'
import { ref, defineProps, watch } from 'vue'
import { type Meal } from '@/types/types'
import MealIngredient from '@/components/meals/MealIngredient.vue'
import VideoPlayer from '@/components/meals/VideoPlayer.vue'
import MealInstructions from '@/components/meals/MealInstructions.vue'

const mealStore = useMealStore()
const props = defineProps({
  id: String
})

const localMeals = ref<Meal | null>(null)

watch(async () => {
  await mealStore.fetchMealDetailsById(props.id)
  localMeals.value = mealStore.mealDetails
})
</script>

<style scoped>
.meal-info {
  display: flex;
  gap: 2rem;
}

.image-container img {
  width: 350px;
  height: auto;
  object-fit: cover;
  border-radius: 4px;
  margin-top: 1rem;
}

h3 {
  font-size: 1.5rem;
}

h3,
h4 {
  margin: 0.5rem 0;
}

div {
  margin: 0.5rem 0;
}
main {
  padding: 0.7rem;
}
@media only screen and (max-width: 768px) {
  .meal-info {
    gap: 2rem;
    flex-flow: column;
  }
  .image-container img {
    width: 100%;
  }
}
</style>
@/stores/mealStore @/types/types
