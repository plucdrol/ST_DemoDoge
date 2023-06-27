<template>
  <div class="header">
    <h1>SPACE TRADERS</h1>
  </div>
  <div class="api-stations">
    <div class="get-playground">
      <h1>Get Playground</h1>
      <button @click="getPlayground">Get Playground</button>
      <textarea class="json-result" v-model="playgroundResult" />
    </div>
    <div class="info">
      <h1>Info</h1>
      <button @click="getInfo">Get Info</button>
      <textarea class="json-result" v-model="infoResult" />
    </div>
    <div class="register">
      <h1>Register</h1>
      <input type="text" v-model="symbol" placeholder="symbol" />
      <input type="text" v-model="faction" placeholder="faction" />
      <button @click="register">Register</button>
      <textarea class="json-result" v-model="registerResult" />
    </div>

    <div class="login">
      <h1>Login</h1>
      <input type="text" v-model="token" placeholder="token" />
      <button @click="login">Login</button>
      <textarea class="json-result" v-model="loginResult" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'SpaceTraders',
  data() {
    return {
      playgroundResultJson: this.getPlayground(),
      infoResultJson: this.getInfo(),
      symbol: '',
      faction: '',
      registerResultJson: 'Not registered yet',
      token: '',
      loginResultJson: 'Not logged in yet'
    }
  },

  computed: {
    playgroundResult() {
      return JSON.stringify(this.playgroundResultJson, null, '\t');
    },
    infoResult() {
      return JSON.stringify(this.infoResultJson, null, '\t');
    },
    registerResult() {
      return JSON.stringify(this.registerResultJson, null, '\t');
    },
    loginResult() {
      return JSON.stringify(this.loginResultJson, null, '\t');
    }
  },

  methods: {

    async getPlayground() {
      this.playgroundResultJson = await fetch('https://api.spacetraders.io/v2/factions', {
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
    
    async getInfo() {
      this.infoResultJson = await fetch('https://api.spacetraders.io/v2/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          return response.json();
        })
        .catch(error => console.error('Error (info):', error));
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

    async login() {
      this.loginResultJson = await fetch('https://api.spacetraders.io/v2/my/agent', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.token
        }
      })
        .then(response => response.json())
        .catch(error => console.error('Error (login):', error));
    }
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

pre {
  text-align: left;
}
</style>