//config.ts

export const API_BASE_URL = 'https://www.themealdb.com/api/json/v1/1/'
export const IMAGE_URL = 'https://www.themealdb.com/images/category'
export const ingredient_IMAGE_URL = 'https://www.themealdb.com/images/ingredients'
export const flag_IMAGE_URL = 'https://www.themealdb.com/images/icons/flags/big/64/'

export const fetchFromAPI = async (endpoint: string): Promise<Response> => {
  return fetch(API_BASE_URL + endpoint)
}
