<!--MealIngredient.vue-->
<template>
  <div class="ingredients-container">
    <h3>Ingredients:</h3>
    <ul class="ingredient">
      <li
        v-for="ingredient in ingredientsList"
        :key="ingredient.name"
        @click="detailsLink(ingredient.name)"
      >
        <img :src="ingredient.image" :alt="ingredient.name" class="ingredient-pic" />
        <p>{{ ingredient.measure }} {{ ingredient.name }}</p>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useMealStore } from '@/stores/mealStore'
import { useRouter } from 'vue-router'
import { defineProps, computed } from 'vue'
import { type Meal } from '@/types/types'
import { ingredient_IMAGE_URL } from '@/utils/config'

const mealStore = useMealStore()

const router = useRouter()

const localMealsProp = defineProps<{ localMeals: Meal | null }>()

const ingredientsList = computed(() => createIngredientsList(localMealsProp.localMeals))

const navigateToSearchResults = (query: string) => {
  router.push({ name: 'SearchByIngredient', query: { q: query } })
}
const detailsLink = (query: string) => {
  navigateToSearchResults(query)
  mealStore.SearchResultByEnter(query, 'ingredient')
}
function createIngredientsList(meal: Meal | null) {
  const ingredientsList = []
  const measurePrefix = 'strMeasure'
  const ingredientPrefix = 'strIngredient'

  for (let i = 1; i <= 20; i++) {
    const ingredient = meal?.[ingredientPrefix + i]
    const measure = meal?.[measurePrefix + i]

    if (ingredient && measure) {
      const imageUrl = `${ingredient_IMAGE_URL}/${ingredient}.png`

      ingredientsList.push({
        image: imageUrl,
        name: ingredient,
        measure
      })
    }
  }

  return ingredientsList
}
</script>

<style scoped>
.ingredients-container {
  flex: 1;
}
.ingredient {
  display: grid;
  gap: 20px;
  list-style-type: none;
  text-align: center;
}

.ingredient li {
  cursor: pointer;
}

.ingredient-pic {
  width: 75%;
  height: auto;
  object-fit: cover;
  border-radius: 4px;
  margin-right: 1rem;
}
@media only screen and (max-width: 768px) {
  .ingredient {
    grid-template-columns: repeat(2, 1fr); /* Two items per row on smaller screens */
  }
}

/* For larger screens */
@media only screen and (min-width: 769px) {
  .ingredient {
    grid-template-columns: repeat(3, 1fr); /* Three items per row on larger screens */
  }
}
</style>
@/types/types
