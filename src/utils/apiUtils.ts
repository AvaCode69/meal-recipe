// utils/apiUtils.ts
import { fetchFromAPI } from './config'

// Fetch  meals: based on the selected category or area , Fetch  meals: search meal by ingredient or by meal name , Fetches list of category or area
export const fetchData = async (endpoint: string, errorMessage: string) => {
  const { useMealStore } = await import('../stores/mealStore')
  const mealStore = useMealStore()
  mealStore.isLoading = true
  mealStore.error = ''

  try {
    const response = await fetchFromAPI(endpoint)
    if (!response.ok) {
      const error = new Error(errorMessage || 'Failed to fetch!')
      throw error
    }

    return response.json()
  } catch (err) {
    console.error(`Error: ${errorMessage}`, err)
    mealStore.error = errorMessage
  } finally {
    mealStore.isLoading = false
  }
}
