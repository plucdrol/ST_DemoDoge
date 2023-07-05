import { type Agent } from "spacetraders-sdk";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAgentsStore = defineStore('agents', () => {
    const myAgent = ref({} as Agent)
    function setMyAgent(agent: Agent) {
        myAgent.value = agent
    }
    return { myAgent, setMyAgent }
})