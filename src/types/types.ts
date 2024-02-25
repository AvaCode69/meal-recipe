//types.ts

export interface Meal {
  idMeal: string
  strMeal: string
  strCategory: string
  strArea: string
  strMealThumb: string
  strInstructions: string
  strYoutube: string
}

export interface Category {
  strCategory: string
}
export interface Area {
  strArea: string
}
export interface SearchResults {
  idMeal: string
  strMeal: string
  strMealThumb: string
}
