<template>
  <div class="header">
    <h1>SPACE TRADERS</h1>
  </div>
  <div class="api-stations">
    <div>
      <button @click="toggleStatus">Status</button>
      <StatusBar v-show="enableStatus" />
    </div>
    <MyInfo />
    <div>
      <button @click="toggleRecruitment">Recruitment</button>
      <RecruitmentStation v-show="enableRecruitment" />
    </div>
  </div>

  <div class="api-stations">
    <div class="get-playground">
      <h1>Get Playground</h1>
      <button @click="getPlayground">Get Playground</button>
      <textarea class="json-result" v-model="playgroundResult" />
    </div>
  </div>
</template>

<script>
import MyInfo from './stations/MyInfo.vue';
import RecruitmentStation from './stations/RecruitmentStation.vue';
import StatusBar from './stations/StatusBar.vue';

export default {
  name: 'SpaceTraders',
  components: {
    MyInfo,
    RecruitmentStation,
    StatusBar
  },
  data() {
    return {
      enableRecruitment: false,
      enableStatus: false,
      playgroundResultJson: this.getPlayground(),
    }
  },

  computed: {
    playgroundResult() {
      return JSON.stringify(this.playgroundResultJson, null, '\t');
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
    toggleRecruitment() {
      this.enableRecruitment = !this.enableRecruitment;
    },
    toggleStatus() {
      this.enableStatus = !this.enableStatus;
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