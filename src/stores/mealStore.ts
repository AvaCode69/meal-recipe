// stores/mealStore.ts
import { defineStore } from 'pinia'
import { onMounted } from 'vue'
import { useMealList } from './composables/useMealList'
import { useCategories } from './composables/useCategories'
import { useAreas } from './composables/useAreas'
import { useMealDetails } from './composables/useMealDetails'

export const useMealStore = defineStore('meals', () => {
  const {
    mealsData,
    loadMeals,
    isLoading,
    error,
    searchResults,
    SearchResultByEnter,
    searchAutoResults,
    autoSearchResult
  } = useMealList()
  const { categories, fetchCategories, getMealsByCategory } = useCategories(mealsData)
  const { areas, fetchArea, getMealsByArea } = useAreas(mealsData)
  const { fetchMealDetailsById, mealDetails } = useMealDetails()

  onMounted(() => {
    fetchCategories()
    loadMeals()
    fetchArea()
  })

  return {
    mealsData,
    searchResults,
    loadMeals,
    isLoading,
    error,
    categories,
    SearchResultByEnter,
    fetchCategories,
    areas,
    fetchArea,
    fetchMealDetailsById,
    getMealsByCategory,
    getMealsByArea,
    mealDetails,
    autoSearchResult,
    searchAutoResults
  }
})
