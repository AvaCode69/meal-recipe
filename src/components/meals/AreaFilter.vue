<!--AreaFilter.vue-->

<template>
  <filter-list type="area" :items="mealStore.areas" typeKey="strArea" />
</template>

<script setup lang="ts">
import { useMealStore } from '@/stores/mealStore'
import FilterList from './FilterList.vue'

const mealStore = useMealStore()
</script>
