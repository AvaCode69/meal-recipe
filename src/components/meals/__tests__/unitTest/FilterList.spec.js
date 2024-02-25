import { shallowMount } from '@vue/test-utils'
import FilterList from '../../FilterList.vue'

describe('FilterList.vue', () => {
  it('renders items correctly for category type', () => {
    const items = [
      { strCategory: 'Category 1' },
      { strCategory: 'Category 2' },
      { strCategory: 'Category 3' }
    ]
    const wrapper = shallowMount(FilterList, {
      props: {
        type: 'category',
        items: items,
        typeKey: 'strCategory'
      }
    })

    const renderedItems = wrapper.findAll('.filter-item')
    expect(renderedItems.length).toBe(items.length)

    items.forEach((item, index) => {
      const renderedItem = renderedItems[index]
      expect(renderedItem.find('.item-name').text()).toBe(item.strCategory)
    })
  })

  it('renders items correctly for area type', () => {
    const items = [{ strArea: 'Area 1' }, { strArea: 'Area 2' }, { strArea: 'Area 3' }]
    const wrapper = shallowMount(FilterList, {
      props: {
        type: 'area',
        items: items,
        typeKey: 'strArea'
      }
    })

    const renderedItems = wrapper.findAll('.filter-item')
    expect(renderedItems.length).toBe(items.length)

    items.forEach((item, index) => {
      const renderedItem = renderedItems[index]
      expect(renderedItem.find('.item-name').text()).toBe(item.strArea)
    })
  })
})
