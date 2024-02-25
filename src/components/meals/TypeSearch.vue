<!--TypeDropdown.vue-->
<template>
  <div class="search-type-dropdown">
    <button class="dropdown-toggle" @click="toggleDropdown">
      {{ searchTypeLabel }}
      <i class="fas fa-chevron-down"></i>
    </button>
    <ul v-show="dropdownVisible" class="dropdown-menu">
      <li
        v-for="option in searchOptions"
        :key="option.value"
        @click="changeSearchType(option.value)"
      >
        {{ option.label }}
      </li>
    </ul>
  </div>
</template>
<script setup>
import { ref, onMounted, computed, onUnmounted,defineProps } from 'vue'
import { useMealStore } from '@/stores/mealStore'

const { searchTypeOptions } = defineProps(['searchTypeOptions'])

const mealStore = useMealStore()
const searchType = ref<'meal' | 'ingredient'>('meal')

const dropdownVisible = ref<boolean>(false)


const toggleDropdown = () => {
  dropdownVisible.value = !dropdownVisible.value
}


const changeSearchType = (type) => {
  searchType.value = type
  dropdownVisible.value = false
  if (searchQuery.value.trim() !== '') {
    navigateToSearchResults(searchQuery.value)
    mealStore.SearchResultByEnter(searchQuery.value, searchType.value)
  }
}

const handleOutsideClick = (event: MouseEvent) => {
  if (dropdownVisible.value && !event.target.closest('.search-type-dropdown')) {
    dropdownVisible.value = false
  }
}

onMounted(() => {
  document.body.addEventListener('mousedown', handleOutsideClick)
})

onUnmounted(() => {
  document.body.removeEventListener('mousedown', handleOutsideClick)
})
</script>

<style scoped>
.search-type-dropdown {
  position: relative;
}

.dropdown-toggle {
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 21px);
  left: 0;
  width: auto;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  list-style: none;
  padding: 0.5rem 0;
  margin: 0;
  z-index: 1;
  min-height: 14vh;
  overflow-y: auto;
  font-size: 14px;
  line-height: 1.5rem;
}

.dropdown-menu li {
  padding: 0.5rem;
  cursor: pointer;
}

.dropdown-menu li:hover {
  background-color: #f5f5f5;
}
@media only screen and (max-width: 768px) {
  .search-type-dropdown {
    width: 50%;
  }
}
</style>
