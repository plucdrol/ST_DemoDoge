import { defineStore } from 'pinia'

export const useAgentStore = defineStore('agent', {
    state: () => ({
        agent: {
            accountId: '',
            symbol: '',
            headquarters: '',
            credits: 0,
            startingFaction: ''
        }
    }),
    getters: {
        myAgent() {
            return this.myAgent
        },
    },
    actions: {
        fetchMyAgent(token) {
            fetch('https://api.spacetraders.io/v2/my/agent', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            }).then(response => response.json())
                .then(data => { this.agent = data })
                .catch(error => console.log(error))
        }
    }
})