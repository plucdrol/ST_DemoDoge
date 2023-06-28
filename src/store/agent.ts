import { defineStore } from 'pinia'

export interface Agent {
    accountId: string,
    symbol: string,
    headquearters: string,
    credits: number,
    startingFaction: string
}

export const useAgentStore = defineStore('agent', {
    state: () => ({
        agent: {
            accountId: '',
            symbol: '',
            headquearters: '',
            credits: 0,
            startingFaction: ''
        },
    }),
    getters: {
        getAgent() {
            return this.agent
        }
    },
    actions: {
        fetchMyAgent() {
            return new Promise((resolve, reject) => {
                this.$pinia.$store.$http.get('https://api.spacetraders.io/v2/my/agent')
                    .then((response) => {
                        this.setAgent(response.data)
                        resolve(response)
                    })
                    .catch((error) => {
                        reject(error)
                    })
            })
        },
        setAgent(agent) {
            this.agent = agent
        }
    },
})
