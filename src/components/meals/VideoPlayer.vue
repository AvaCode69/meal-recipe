<!-- VideoPlayer.vue -->
<template>
  <div v-if="localMealsProp.localMeals && localMealsProp.localMeals.strYoutube">
    <h3>Video:</h3>
    <iframe :src="getEmbeddedVideoLink()" frameborder="0" allowfullscreen></iframe>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { type Meal } from '@/types/types'

const localMealsProp = defineProps<{ localMeals: Meal | null }>()

function getEmbeddedVideoLink() {
  const youtubeLink = localMealsProp.localMeals?.strYoutube

  if (youtubeLink && youtubeLink.includes('youtube.com')) {
    const videoId = youtubeLink.split('v=')[1]
    return `https://www.youtube.com/embed/${videoId}`
  }

  return undefined
}
</script>
<style scoped>
iframe {
  width: 560px;
  height: 315px;
}
@media only screen and (max-width: 768px) {
  iframe {
    width: 100%;
    height: auto;
  }
}
</style>
@/types/types
