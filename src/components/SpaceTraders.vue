<template>
  <div class="header">
    <h1>SPACE TRADERS</h1>
  </div>
  <StatusBar />
  <div class="api-stations">
    <div class="get-playground">
      <h1>Get Playground</h1>
      <button @click="getPlayground">Get Playground</button>
      <textarea class="json-result" v-model="playgroundResult" />
    </div>
    <div class="register">
      <h1>Register</h1>
      <input type="text" v-model="symbol" placeholder="symbol" />
      <input type="text" v-model="faction" placeholder="faction" />
      <button @click="register">Register</button>
      <textarea class="json-result" v-model="registerResult" />
    </div>

    <div class="me">
      <h1>Me</h1>
      <input type="text" v-model="token" placeholder="token" />
      <button @click="getMyInfo">Get my info</button>
      <div class="my-info-divs">
        <textarea class="json-result" v-model="meResult" />
        <textarea class="json-result" v-model="myContractsResult" />
      </div>
    </div>
  </div>
</template>

<script>
import StatusBar from './StatusBar.vue'

export default {
  name: 'SpaceTraders',
  components: {
    StatusBar
  },
  data() {
    return {
      playgroundResultJson: this.getPlayground(),
      symbol: process.env.VUE_APP_SYMBOL,
      faction: '',
      registerResultJson: 'Not registered yet',
      token: process.env.VUE_APP_TOKEN,
      meResultJson: 'Not logged in yet',
      myContractsResultJson: 'Not logged in yet'
    }
  },

  computed: {
    playgroundResult() {
      return JSON.stringify(this.playgroundResultJson, null, '\t');
    },
    registerResult() {
      return JSON.stringify(this.registerResultJson, null, '\t');
    },
    meResult() {
      return JSON.stringify(this.meResultJson, null, '\t');
    },
    myContractsResult() {
      return JSON.stringify(this.myContractsResultJson, null, '\t');
    }
  },

  methods: {

    async getPlayground() {
      this.playgroundResultJson = await fetch('https://api.spacetraders.io/v2/factions?limit=20', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          return response.json();
        })
        .catch(error => console.error('Error (playground):', error));
    },
    async register() {
      this.registerResultJson = await fetch('https://api.spacetraders.io/v2/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          symbol: this.symbol,
          faction: this.faction
        })
      })
        .then(response => response.json())
        .catch(error => console.error('Error (register):', error));
    },

    async getMyInfo() {
      Promise.all(this.getMyAgent(), this.getMyContracts());
    },

    async getMyAgent() {
      this.meResultJson = await fetch('https://api.spacetraders.io/v2/my/agent', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.token
        }
      })
        .then(response => response.json())
        .catch(error => console.error('Error (me):', error));
    },

    async getMyContracts() {
      this.myContractsResultJson = await fetch('https://api.spacetraders.io/v2/my/contracts', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.token
        }
      })
        .then(response => response.json())
        .catch(error => console.error('Error (contracts):', error));
    },
  }
}
</script>

<style>
.api-stations {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin: 20px;
}

.json-result {
  display: block;
  width: 100%;
  height: 200px;
  margin: 10px;
}

.my-info-divs {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin: 20px;
}

pre {
  text-align: left;
}
</style>