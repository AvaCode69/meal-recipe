// stores/useMealList.ts
import { ref } from 'vue'
import type { Meal } from '../../types/types'
import { fetchData } from '../../utils/apiUtils'
import { API_BASE_URL } from '../../utils/config'

export const useMealList = () => {
  const mealsData = ref<Meal[]>([])
  const searchResults = ref<Meal[]>([])
  const searchAutoResults = ref<Meal[]>([])
  const isLoading = ref<boolean>(false)
  const error = ref<string>('')

  //Loads random meals data
  const loadMeals = async (): Promise<void> => {
    const responseData = await fetchData('random.php', 'Failed to fetch meals!')

    if (responseData) {
      mealsData.value = responseData.meals
    }
  }
  //Searches meals by query and updates search results by pressing enter.
  const SearchResultByEnter = async (
    query: string,
    searchBy: 'meal' | 'ingredient'
  ): Promise<void> => {
    let responseData
    if (searchBy === 'meal') {
      responseData = await fetchData(`search.php?s=${query}`, 'Failed to fetch search results!')
    } else if (searchBy === 'ingredient') {
      responseData = await fetchData(`filter.php?i=${query}`, 'Failed to fetch search results!')
    }

    if (responseData) {
      searchResults.value = responseData.meals || []
      error.value = responseData.meals ? '' : 'No meals found!'
    }
  }
  //Fetches auto search results by query and updates searchAutoResults.
  const autoSearchResult = async (
    query: string,
    searchBy: 'meal' | 'ingredient'
  ): Promise<void> => {
    let responseData

    if (searchBy === 'meal') {
      const response = await fetch(`${API_BASE_URL}/search.php?s=${query}`)

      responseData = await response.json()
    } else if (searchBy === 'ingredient') {
      const response = await fetch(`${API_BASE_URL}/filter.php?i=${query}`)
      responseData = await response.json()
    }

    if (responseData) {
      searchAutoResults.value = responseData.meals || []
    }
  }

  return {
    mealsData,
    searchResults,
    loadMeals,
    isLoading,
    error,
    SearchResultByEnter,
    searchAutoResults,
    autoSearchResult
  }
}
