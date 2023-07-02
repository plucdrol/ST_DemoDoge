<script setup lang="ts">

const getPlayground = () => {
    console.log('get playground')
}

</script>

<template>
  <div class="header">
    <h1>SPACE TRADERS</h1>
  </div>
  <div class="api-stations">
    <div class="playground">
      <h1>Get Playground</h1>
      <button @click="getPlayground">Get Playground</button>
    </div>
  </div>
</template>

<style scoped>
.header {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 10vh;
}
.stations {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
}
</style>