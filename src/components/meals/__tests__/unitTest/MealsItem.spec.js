import { mount } from '@vue/test-utils'
import MealsItem from '@/components/meals/MealsItem.vue'

describe('MealsItem.vue', () => {
  it('renders meal name and image correctly', () => {
    const meal = {
      idMeal: '1',
      strMeal: 'Spaghetti Carbonara',
      strMealThumb: 'https://www.example.com/spaghetti.jpg'
    }

    const wrapper = mount(MealsItem, {
      props: {
        meal
      }
    })

    expect(wrapper.find('p').text()).toBe(meal.strMeal)

    expect(wrapper.find('img').attributes('src')).toBe(meal.strMealThumb)
    expect(wrapper.find('img').attributes('alt')).toBe(meal.strMeal)
  })
})
