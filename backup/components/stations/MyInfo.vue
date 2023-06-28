<template>
    <div class="me">
        <h1>Me</h1>
        <input type="text" v-model="token" placeholder="token" />
        <button @click="getMyInfo">Load</button>
        <div class="my-info-divs">
            <textarea class="json-result" v-model="meResult" />
            <textarea class="json-result" v-model="myContractsResult" />
        </div>
    </div>
</template>

<script>

import { useAgentStore } from '@/store/agent';
import { mapStores } from 'pinia';

const agentStore = useAgentStore();

export default {
    name: 'MyInfo',
    data() {
        return {
            token: process.env.VUE_APP_TOKEN,
            meResultJson: 'Load me',
            myContractsResultJson: 'Load me'
        }
    },
    mounted() {
        this.agentStore.fetchMyAgent();
    },
    computed: {
        meResult() {
            return JSON.stringify(this.agentStore.myAgent, null, '\t');
        },
        myContractsResult() {
            return JSON.stringify(this.myContractsResultJson, null, '\t');
        },
        ...mapStores(agentStore)
    },
    methods: {
        async getMyInfo() {
            this.agentStore.fetchMyAgent(this.token);
            
            this.myContractsResultJson = await this.getMyContracts();
        },
        async getMyAgent() {
            return await fetch('https://api.spacetraders.io/v2/my/agent', {
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
            return await fetch('https://api.spacetraders.io/v2/my/contracts', {
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

<style></style>