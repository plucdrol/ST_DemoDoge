<script setup lang="ts">

import { Configuration, DefaultApi, FactionSymbols } from 'spacetraders-sdk'
import { ref } from 'vue'

const token = ref('')
const statusResult = ref('')

const createConfiguration = () => {
  return new Configuration({
    basePath: import.meta.env.VITE_SPACE_TRADERS_BASE_URL,
    accessToken: token.value !== '' ? token.value : import.meta.env.VITE_SPACE_TRADERS_TOKEN
  })
}

const useDefaultApi = () => {
  return new DefaultApi(createConfiguration())
}

const getStatus = () => {
  useDefaultApi().getStatus().then(data => {
    console.log(data)
    statusResult.value = JSON.stringify(data, null, '\t')
  })
}

const symbol = ref('')
const faction = ref('')
const registerResult = ref('')
const register = () => {
  useDefaultApi().register({
    registerRequest: {
      symbol: symbol.value,
      faction: FactionSymbols.Solitary
    }
  }).then(data => {
    console.log(data)
    registerResult.value = JSON.stringify(data, null, '\t')
  })
}

</script>

<template>
  <div class="api-stations">
    <div class="credentials">
      <h3>Credentials</h3>
      <input type="text" v-model="token" placeholder="token" />
    </div>
    <div class="status">
      <h1>Status</h1>
      <button class="api-button" @click="getStatus">Get Status</button>
      <textarea v-model="statusResult"></textarea>
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

.api-button {
  margin: 4px 2px;
  padding: 4px 2px;
  border-radius: 4px;
  border: 1px solid black;
  background-color: white;
  cursor: pointer;
}
</style>