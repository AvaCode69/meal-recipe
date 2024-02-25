import { shallowMount } from '@vue/test-utils'
import MealSearch from '@/components/meals/MealSearch.vue'
// Mock the Pinia store
jest.mock('@/stores/mealStore', () => ({
  useMealStore: jest.fn(() => ({
    searchAutoResults: [],
    autoSearchResult: jest.fn(),
    SearchResultByEnter: jest.fn()
  }))
}))
describe('MealSearch', () => {
  it('renders correctly', async () => {
    const wrapper = shallowMount(MealSearch)

    expect(wrapper.exists()).toBe(true)

    const inputElement = wrapper.find('input')
    expect(inputElement.exists()).toBe(true, 'Input element should exist.')
  })
})
