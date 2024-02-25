import { mount } from '@vue/test-utils'
import MealInstructions from '../../MealInstructions.vue'

describe('MealInstructions.vue', () => {
  it('renders no instructions when localMeals is null', async () => {
    const wrapper = mount(MealInstructions, {
      props: {
        localMeals: null
      }
    })

    expect(wrapper.findAll('li').length).toBe(0)
  })

  it('renders no instructions when localMeals is empty', async () => {
    const wrapper = mount(MealInstructions, {
      props: {
        localMeals: { strInstructions: '' }
      }
    })

    expect(wrapper.findAll('li').length).toBe(0)
  })

  it('renders instructions correctly when localMeals contains valid instructions', async () => {
    const instructions = 'Step 1\r\nStep 2\r\nStep 3'
    const wrapper = mount(MealInstructions, {
      props: {
        localMeals: { strInstructions: instructions }
      }
    })

    expect(wrapper.findAll('li').length).toBe(3)

    expect(wrapper.text()).toContain('Step 1')
    expect(wrapper.text()).toContain('Step 2')
    expect(wrapper.text()).toContain('Step 3')
  })
})
