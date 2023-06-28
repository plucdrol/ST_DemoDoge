import { defineStore } from 'pinia'

export interface Contract {
    id: number
}

export const useContractsStore = defineStore('contracts', {
    state: () => ({
        contracts: [],
    }),
    getters: {
        getContracts() {
            return this.contracts
        },
    },
    actions: {
        setContracts(contracts) {
            this.contracts = contracts
        },
    },
})
