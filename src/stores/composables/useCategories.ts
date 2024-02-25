// useCategories.ts
import { ref, onMounted, type Ref } from 'vue'
import type { Category, Meal } from '../../types/types'
import { apiDataUtils } from '../../utils/apiDataUtils'

export const useCategories = (mealsData: Ref<Meal[]>) => {
  const categories = ref<Category[]>([])
  const { getMealsByEndpoint, fetchAndSetData } = apiDataUtils()

  const mapCategory = (category: any) => ({
    strCategory: category.strCategory
  })

  // Fetches list of category from API.
  const fetchCategories = async (): Promise<void> => {
    categories.value = await fetchAndSetData<Category>(
      'list.php?c=list',
      'Failed to fetch categories',
      mapCategory
    )
  }
  // Fetches meals filtered by selected category .
  const getMealsByCategory = async (selectedCategory: string): Promise<void> => {
    mealsData.value = await getMealsByEndpoint(
      `filter.php?c=${selectedCategory}`,
      'Failed to fetch filtered meals!'
    )
  }

  onMounted(() => {
    fetchCategories()
  })

  return {
    categories,
    fetchCategories,
    getMealsByCategory
  }
}
