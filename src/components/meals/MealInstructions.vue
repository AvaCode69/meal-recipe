<!--MealInstructions.vue-->
<template>
  <div v-if="localMealsProp.localMeals" class="content">
    <div class="Instructions">
      <h3>Instructions</h3>
      <ul>
        <li v-for="(step, index) in formattedInstructions" :key="index">{{ step }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue'
import { type Meal } from '@/types/types'

const localMealsProp = defineProps<{ localMeals: Meal | null }>()

const formattedInstructions = computed(() => {
  if (!localMealsProp.localMeals || !localMealsProp.localMeals.strInstructions) return []

  return localMealsProp.localMeals.strInstructions
    .split('\r\n')
    .map((step) => step.trim())
    .filter((step) => step.length > 0)
})
</script>

<style scoped>
.content {
  padding: 0 11%;
  text-align: center;
}
.Instructions {
  padding: 3rem 0;
  line-height: 2;
  letter-spacing: 0.02rem;
}

li {
  list-style: none;
}

@media only screen and (max-width: 768px) {
  .content {
    padding: 0 2%;
  }
}
</style>
@/types/types
