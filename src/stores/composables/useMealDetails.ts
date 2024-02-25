// useMealDetails.ts
import { ref } from 'vue'
import type { Meal } from '../../types/types'
import { fetchData } from '../../utils/apiUtils'

export const useMealDetails = () => {
  const mealDetails = ref<Meal | null>(null)

  //Fetches details of a meal by its ID
  const fetchMealDetailsById = async (mealId: string): Promise<void> => {
    const responseData = await fetchData(`lookup.php?i=${mealId}`, 'Failed to fetch meal details!')

    if (responseData && responseData.meals && responseData.meals.length > 0) {
      mealDetails.value = responseData.meals[0]
    }
  }

  return {
    mealDetails,
    fetchMealDetailsById
  }
}
