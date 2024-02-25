//router.ts

import { createRouter, createWebHistory } from 'vue-router'
import NotFound from './pages/NotFound.vue'
import MealDetails from './pages/meals/MealDetails.vue'
import HomePage from './pages/meals/HomePage.vue'
import SearchResults from './pages/meals/SearchResults.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: HomePage,
      meta: {
        pageTitle: 'Random Meal'
      }
    },
    { path: '/category/:catName', component: HomePage, name: 'Category' },
    { path: '/area/:areaName', component: HomePage, name: 'Area' },
    { path: '/recipe/:id', component: MealDetails, props: true, name: 'MealDetails' },
    { path: '/results', component: SearchResults, name: 'SearchResults' },
    { path: '/ingredient', component: SearchResults, name: 'SearchByIngredient' },
    { path: '/meal', component: SearchResults, name: 'SearchByMeal' },
    { path: '/:notFound(.*)', component: NotFound }
  ]
})

export default router
