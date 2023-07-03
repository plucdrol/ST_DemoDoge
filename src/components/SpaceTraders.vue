<script setup lang="ts">

import { ref } from 'vue'

const endpoint = ref('')
const token = ref('')
const playgroundResult = ref('')
const getPlayground = () => {
  fetch(import.meta.env.VITE_SPACE_TRADERS_BASE_URL + endpoint.value, {
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": "Bearer " + (token.value !== '' ? token.value : import.meta.env.VITE_SPACE_TRADERS_TOKEN)
    }
  }).then(response => response.json())
    .then(data => {
      console.log(data)
      playgroundResult.value = JSON.stringify(data, null, '\t')
    })
}

const symbol = ref('')
const faction = ref('')
const registerResult = ref('')
const register = () => {
  fetch(import.meta.env.VITE_SPACE_TRADERS_BASE_URL + '/register', {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      symbol: symbol.value,
      faction: faction.value
    })
  }).then(response => response.json())
  .then(data => {
    console.log(data)
    registerResult.value = JSON.stringify(data, null, '\t')
  })
}

</script>

<template>
  <div class="api-stations">
    <div class="playground">
      <h1>Playground</h1>
      <input type="text" v-model="endpoint" placeholder="endpoint" />
      <input type="text" v-model="token" placeholder="token" />
      <button class="api-button" @click="getPlayground">Get Playground</button>
      <textarea v-model="playgroundResult"></textarea>
    </div>
    <div class="register">
      <h1>Register</h1>
      <input type="text" v-model="symbol" placeholder="symbol" />
      <input type="text" v-model="faction" placeholder="faction" />
      <button class="api-button" @click="register">Register</button>
      <textarea v-model="registerResult"></textarea>
    </div>
  </div>
</template>

<style scoped>

input {
  margin: 4px 2px;
}

textarea {
  width: 100%;
  height: 200px;
}

.api-stations {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

</style>