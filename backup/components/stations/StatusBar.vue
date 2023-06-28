<template>
  <div class="container">
    <!-- TODO DebugInfo.vue /-->
    <div class="debug">
      <button @click="toggleDebug">Debug</button>
      <div>
        <textarea v-if="debugEnabled" v-model="infoResult" />
      </div>
    </div>
    <div class="status">
      <h3>Status (<b>{{ infoResultJson.version }}</b>) : <b>{{ infoResultJson.status }}</b></h3>
      <div>
        <h4>Resets (frequency: <b>{{ infoResultJson.serverResets?.frequency }}</b>)</h4>
        <p>Current reset date: <b>{{ currentReset }}</b></p>
        <p>Next reset date: <b>{{ nextReset }}</b></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StatusBar',
  data() {
    return {
      infoResultJson: this.getInfo(),
      debugEnabled: false
    }
  },
  computed: {
    infoResult() {
      return JSON.stringify(this.infoResultJson, null, '\t');
    },
    currentReset() {
      return this.infoResultJson.resetDate ? new Date(this.infoResultJson.resetDate).toDateString() : null;
    },
    nextReset() {
      return this.infoResultJson?.serverResets ? new Date(this.infoResultJson.serverResets.next).toDateString() : null;
    }
  },
  methods: {
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
    toggleDebug() {
      this.debugEnabled = !this.debugEnabled;
    }
  }
}
</script>

<style>
.status {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 50%;
  margin: 0 auto;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #eee;
}
</style>