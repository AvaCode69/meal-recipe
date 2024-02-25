<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<style scoped>
.card {
  border-radius: 3px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  margin: 2rem auto;
  padding: 3rem;
  /* text-align: center; */
}

@media only screen and (max-width: 768px) {
  .card[data-v-591cfde7] {
    padding: 1.5rem;
  }
}
</style>
