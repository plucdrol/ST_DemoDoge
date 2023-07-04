<script lang="ts">

import { Configuration, DefaultApi, FactionSymbols, AgentsApi, ContractsApi, type Agent, type GetStatus200Response, type RegisterRequest, type Register201ResponseData, type Contract, FactionsApi, type Faction } from 'spacetraders-sdk'
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    basePath: {
      type: String,
      default: import.meta.env.VITE_SPACE_TRADERS_BASE_URL
    },
    token: {
      type: String,
      default: import.meta.env.VITE_SPACE_TRADERS_TOKEN
    }
  },
  data() {
    return {
      factions: [] as Faction[],
      registerRequest: {
        symbol: '',
        faction: '' as FactionSymbols
      },
      registerResult: {} as Register201ResponseData,
      myAgent: {} as Agent,
      status: {} as GetStatus200Response,
      myContracts: [] as Contract[]
    }
  },
  mounted() {
    this.getStatus()
    this.getFactions()
    this.getMyAgent()
    this.getMyContracts()
  },
  methods: {
    pretty(obj: any) {
      return JSON.stringify(obj, null, "\t")
    },
    createConfiguration() {
      return new Configuration({
        basePath: this.basePath,
        accessToken: this.token
      })
    },
    useDefaultApi() {
      return new DefaultApi(this.createConfiguration())
    },
    useAgentsApi() {
      return new AgentsApi(this.createConfiguration())
    },
    useContractsApi() {
      return new ContractsApi(this.createConfiguration())
    },
    useFactionsApi() {
      return new FactionsApi(this.createConfiguration())
    },
    getStatus() {
      this.useDefaultApi().getStatus().then(data => {
        console.log(data)
        this.status = data
      })
    },
    getFactions() {
      this.useFactionsApi().getFactions({
        limit: 20
      }).then(data => {
        console.log(data)
        this.factions = data.data
      })
    },
    register(registerRequest: RegisterRequest) {
      this.useDefaultApi().register({
        registerRequest
      }).then(data => {
        console.log(data)
        this.registerResult = data.data
        // TODO save token in env file then restart lol
      })
    },
    getMyAgent() {
      this.useAgentsApi().getMyAgent()
        .then(data => {
          console.log(data)
          this.myAgent = data.data
        })
    },
    getMyContracts() {
      this.useContractsApi().getContracts()
        .then(data => {
          console.log(data)
          this.myContracts = data.data
        })
    },
    acceptContract(id: string) {
      this.useContractsApi().acceptContract({contractId: id})
        .then(data => {
          console.log(data)
          this.getMyAgent()
          this.getMyContracts()
        })
    }
  }
})

</script>

<template>
  <div class="container">
    <h1 class="title">Space Traders</h1>
    <div class="info">
      <div class="api-info">
        <h2>API Info</h2>
        <div class="info-property">Status: {{ status?.status }}</div>
        <div class="info-property">Version: {{ status?.version }}</div>
        <div class="info-property">Description: {{ status?.description }}</div>
        <div class="info-property-title">Announcements:</div>
        <ul>
          <li v-for="announcement in status.announcements" :key="announcement.title">{{ announcement.title }} - {{
            announcement.body }}</li>
        </ul>
        <div class="info-property-title">Numbers:</div>
        <ul>
          <li>{{ status?.stats?.agents }} agents</li>
          <li>{{ status?.stats?.ships }} ships</li>
          <li>{{ status?.stats?.systems }} systems</li>
          <li>{{ status?.stats?.waypoints }} waypoints</li>
        </ul>
      </div>
      <div class="register">
        <h2>Register</h2>
        <input type="text" v-model="registerRequest.symbol" placeholder="symbol" />
        <select v-model="registerRequest.faction">
          <option value="" disabled selected>Select faction</option>
          <option v-for="faction in factions" :key="faction.symbol" :value="faction.symbol">{{ faction.name }}</option>
        </select>
        <button class="api-button" @click="register(registerRequest)">Register</button>
        <div class="register-result" v-if="registerResult.agent">
          <h3>Registered! Save the following token in .env.local then restart the app 😅</h3>
          <div class="info-property">Token: {{ registerResult.token }}</div>
          <div class="json-result">{{ pretty(registerResult) }}</div>
        </div>
      </div>
      <div class="agent-info">
        <h2>My Agent</h2>
        <div class="info-property">Account ID: {{ myAgent.accountId }}</div>
        <div class="info-property">Symbol: {{ myAgent.symbol }}</div>
        <div class="info-property">Faction: {{ myAgent.startingFaction }}</div>
        <div class="info-property">HQ: {{ myAgent.headquarters }}</div>
        <div class="info-property">Credits: {{ myAgent.credits }}</div>
      </div>
      <div class="contracts">
        <h2>My Contracts</h2>
        <div class="contract" v-for="contract in myContracts" :key="contract.id">
          <div class="info-property-title">{{ contract.id }}</div>
          <div class="info-property">Faction: {{ contract.factionSymbol }}</div>
          <div class="info-property">Type: {{ contract.type }}</div>
          <div class="info-property">Accepted: {{ contract.accepted }}</div>
          <div class="info-property">Deadline to accept: {{ contract.deadlineToAccept }}</div>
          <div class="info-property">Fulfilled: {{ contract.fulfilled }}</div>
          
          <div class="contract-terms">
            <div class="info-property-title">Terms:</div>
            <div class="info-property">Deadline: {{ contract.terms.deadline }}</div>
            <div class="info-property-title">Payment:</div>
            <div class="info-property">On accepted: {{ contract.terms.payment.onAccepted }}</div>
            <div class="info-property">On fulfilled: {{ contract.terms.payment.onFulfilled }}</div>
            <div class="info-property-title">To Deliver:</div>
            <ul>
              <li v-for="good in contract.terms.deliver" :key="good.tradeSymbol">{{ good.tradeSymbol }} to {{ good.destinationSymbol }}: {{ good.unitsFulfilled }} / {{ good.unitsRequired }}</li>
            </ul>
          <button class="api-button" v-if="!contract.accepted" @click="acceptContract(contract.id)">Accept</button>
          </div>
          
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
}

.title {
  text-align: center;
}

.contracts {
  display: flex;
  flex-direction: column;
}

.contract {
  margin: 10px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid black;
}

.api-button {
  margin: 10px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid black;
  background-color: white;
  cursor: pointer;
}

.info-property-title {
  margin: 5px;
  font-weight: bold;
}

.info-property {
  margin: 5px;
}

.json-result {
  margin: 10px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid black;
  background-color: rgb(56, 13, 13);
  width: 500px;
  height: 500px;
  overflow: scroll;
}
</style>