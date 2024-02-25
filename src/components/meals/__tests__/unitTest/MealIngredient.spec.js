import { mount } from '@vue/test-utils'
import MealIngredient from '@/components/meals/MealIngredient.vue'

const mockRouter = {
  push: jest.fn()
}

jest.mock('@/stores/mealStore', () => ({
  useMealStore: jest.fn(() => ({
    SearchResultByEnter: jest.fn()
  }))
}))

describe('MealIngredient.vue', () => {
  it('renders ingredients list correctly', () => {
    const localMealsProp = {
      localMeals: {
        strIngredient1: 'Butter',
        strMeasure1: '100g'
      }
    }
    const wrapper = mount(MealIngredient, {
      props: localMealsProp,
      global: {
        mocks: {
          $router: mockRouter
        }
      }
    })

    const ingredientsList = wrapper.findAll('.ingredient li')
    expect(ingredientsList).toHaveLength(1)

    const firstIngredient = ingredientsList[0]
    expect(firstIngredient.text()).toContain('100g Butter')
  })
})
