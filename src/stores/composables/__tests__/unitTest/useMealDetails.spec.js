import { useMealDetails } from '../../useMealDetails'
import * as apiUtils from '../../../../utils/apiUtils'

jest.mock('../../../../utils/apiUtils')

describe('useMealDetails', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should fetch meal details by id', async () => {
    const mockedData = {
      meals: [
        {
          idMeal: '123',
          strMeal: 'Test Meal'
        }
      ]
    }

    const mealId = '123'
    const { fetchMealDetailsById } = useMealDetails()

    jest.spyOn(apiUtils, 'fetchData').mockResolvedValueOnce(mockedData)

    await fetchMealDetailsById(mealId)

    expect(apiUtils.fetchData).toHaveBeenCalledWith(
      `lookup.php?i=${mealId}`,
      'Failed to fetch meal details!'
    )
    expect(apiUtils.fetchData).toHaveBeenCalledTimes(1)
  })
})
