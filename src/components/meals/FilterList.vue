<!--FilterList-->

<template>
  <div class="filter-list">
    <ul class="dropdown-menu">
      <li v-for="item in items" :key="item[typeKey]" class="filter-item">
        <router-link :to="`/${type}/${item[typeKey]}`" class="item-link">
          <div class="filter-wrapper">
            <img :src="getImagePath(item[typeKey])" :alt="item[typeKey]" class="item-pic" />
            <span class="item-name">{{ item[typeKey] }}</span>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import flags from './flags'
import { defineProps } from 'vue'
import { IMAGE_URL } from '@/utils/config'

const props = defineProps({
  type: String,
  items: Array,
  typeKey: String
})

function getImagePath(name: string) {
  if (props.type === 'category') {
    return `${IMAGE_URL}/${name}.png`
  } else if (props.type === 'area') {
    const flag = flags.find((flag) => flag.name === name)
    return flag ? flag.image : null
  }
}
</script>

<style scoped>
.dropdown-menu {
  background-color: #6a1b9a;
  padding: 0.5rem;
  overflow-y: hidden;
}

.filter-item {
  list-style: none;
}
.item-link {
  text-decoration: none;
  color: #fff;
}
.filter-wrapper {
  display: flex;
  align-items: center;
  margin-bottom: 0.3rem;
}
.item-pic {
  width: 30px;
  height: 30px;
  object-fit: cover;
  border-radius: 2rem;
  margin-right: 1rem;
}
</style>
