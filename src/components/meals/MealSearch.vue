<!--MealSearch-->

<template>
  <div class="search-container">
    <div class="input-container">
      <input
        type="text"
        v-model="searchQuery"
        @input="handleSearchInputChange"
        @keydown.enter.prevent="handleEnterKey"
        @focus="autocompleteListVisible = true"
        @blur="handleBlur"
        class="search-input"
        placeholder="Search"
      />
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
      <button v-if="searchQuery" @click="clearSearch" class="remove-button">
        <span>&times;</span>
      </button>
      <div v-if="!searchQuery" class="search-icon">
        <i class="fas fa-search"></i>
      </div>
    </div>

    <ul v-show="autocompleteListVisible" class="autocomplete-list">
      <li v-for="result in mealStore.searchAutoResults" :key="result.idMeal">
        <router-link
          :to="generateMealDetailsLink(result)"
          @mousedown.prevent
          @click="handleAutocompleteItemClick"
        >
          {{ result.strMeal }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, onUnmounted } from 'vue'
import { useMealStore } from '@/stores/mealStore'
import { useRouter, useRoute } from 'vue-router'

const mealStore = useMealStore()

const searchQuery = ref<string>('')
const autocompleteListVisible = ref<boolean>(false)
const searchType = ref<'meal' | 'ingredient'>('meal')

const searchOptions = [
  { value: 'meal', label: 'Meal' },
  { value: 'ingredient', label: 'Ingredient' }
]

const handleSearchInputChange = () => {
  if (searchQuery.value.trim() !== '') {
    autocompleteListVisible.value = true
    mealStore.autoSearchResult(searchQuery.value, searchType.value)
  } else {
    mealStore.searchAutoResults = []
  }
}

const handleEnterKey = () => {
  autocompleteListVisible.value = false
  if (searchQuery.value.trim() !== '') {
    navigateToSearchResults(searchQuery.value)
    mealStore.SearchResultByEnter(searchQuery.value, searchType.value)
  }
}
const handleBlur = () => {
  autocompleteListVisible.value = false
}

const clearSearch = () => {
  searchQuery.value = ''
  mealStore.searchAutoResults = []
}

const route = useRoute()
const router = useRouter()
const generateMealDetailsLink = (result: any) => {
  return { name: 'MealDetails', params: { id: result.idMeal } }
}
const handleAutocompleteItemClick = () => {
  autocompleteListVisible.value = false
}
const navigateToSearchResults = (query: string) => {
  const routeName = searchType.value === 'ingredient' ? 'SearchByIngredient' : 'SearchByMeal'
  router.push({ name: routeName, query: { q: query } })
}

const dropdownVisible = ref<boolean>(false)

const toggleDropdown = () => {
  dropdownVisible.value = !dropdownVisible.value
}

const changeSearchType = (type: 'meal' | 'ingredient') => {
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

const searchTypeLabel = computed(() => {
  const option = searchOptions.find((opt) => opt.value === searchType.value)
  return option ? option.label : ''
})
</script>

<style scoped>
.autocomplete-list {
  list-style: none;
  margin: 0;
  padding: 0;
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1;
  width: 70%;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
  border-radius: 0.6rem;
  background: #fff;
}

.autocomplete-list li {
  padding: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
a {
  text-decoration: none;
  color: #444242;
}
.autocomplete-list li:hover {
  background-color: #f5f5f5;
}

.search-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2rem auto;
  position: relative;
}

.input-container {
  position: relative;
  border: 1px solid #cccccc;
  border-radius: 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 0.5rem 2rem;
  padding: 0.1rem 1rem;
}

.search-input {
  border: 1px solid #cccccc00;
  font-size: 1rem;
  width: 16rem;
  height: 50px;
  background: none;
}
.search-input:focus,
select.search-type-select {
  outline: none;
  text-decoration: none;
}
select.search-type-select {
  border: none;
}
.remove-button {
  padding: 0.3rem;
  background-color: #a1a1a100;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  /* position: absolute;
  right: 11px;
  right: 1.4rem;
  top: 0.5rem; */
}

.remove-button span {
  font-size: 1.5rem;
  color: #1a1a1a;
}

.search-icon {
  cursor: pointer;
}

.search-icon i {
  font-size: 1.3rem;
  color: #1a1a1a;
  /* position: absolute;
  right: 1.4rem;
  top: 0.8rem; */
}
.search-option {
  background-color: #fff;
  color: #333;
  padding: 5px 10px;
  font-size: 14px;
}

.search-option:hover {
  background-color: #f5f5f5;
}

.search-option:selected {
  font-weight: bold;
  padding: 2rem 3rem;
}
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
  .search-input {
    width: 100%;
  }
  .input-container {
    gap: 0.5rem 0.5rem;
  }
  .search-type-dropdown {
    width: 50%;
  }
}
</style>
