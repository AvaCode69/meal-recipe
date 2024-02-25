// useAreas.ts
import { ref, onMounted, type Ref } from 'vue'
import type { Area, Meal } from '../../types/types'
import { apiDataUtils } from '../../utils/apiDataUtils'

export const useAreas = (mealsData: Ref<Meal[]>) => {
  const areas = ref<Area[]>([])
  const { getMealsByEndpoint, fetchAndSetData } = apiDataUtils()

  const mapArea = (area: any) => ({
    strArea: area.strArea
  })

  // Fetches list of areas from API.
  const fetchArea = async (): Promise<void> => {
    areas.value = await fetchAndSetData<Area>('list.php?a=list', 'Failed to fetch areas', mapArea)
  }
  // Fetches meals filtered by selected area.
  const getMealsByArea = async (selectedArea: string): Promise<void> => {
    mealsData.value = await getMealsByEndpoint<Meal>(
      `filter.php?a=${selectedArea}`,
      'Failed to fetch filtered meals!'
    )
  }

  onMounted(() => {
    fetchArea()
  })

  return {
    areas,
    fetchArea,
    getMealsByArea
  }
}
