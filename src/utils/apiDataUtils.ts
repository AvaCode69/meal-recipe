//apiDataUtils.ts

import { fetchData } from './apiUtils'

export const apiDataUtils = () => {
  const fetchAndSetData = async <T>(
    endpoint: string,
    errorMessage: string,
    mapFunction: (data: any) => T
  ): Promise<T[]> => {
    // Fetches list of category or area from API
    const responseData = await fetchData(endpoint, errorMessage)

    if (responseData) {
      return responseData.meals.map(mapFunction) || []
    }
    return []
  }
  // Fetches meals filtered by selected category or area.
  const getMealsByEndpoint = async <T>(endpoint: string, errorMessage: string): Promise<T[]> => {
    const responseData = await fetchData(endpoint, errorMessage)

    if (responseData) {
      return responseData.meals || []
    }
    return []
  }
  return {
    getMealsByEndpoint,
    fetchAndSetData
  }
}
