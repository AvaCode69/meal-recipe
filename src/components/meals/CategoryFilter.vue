<!--CategoryFilter.vue-->
<template>
  <filter-list type="category" :items="mealStore.categories" typeKey="strCategory" />
</template>

<script setup lang="ts">
import { useMealStore } from '@/stores/mealStore'
import FilterList from './FilterList.vue'

const mealStore = useMealStore()
</script>
