import { useTokenStore } from "@/stores/token";
import { useAgentsStore } from "@/stores/agents";
import { AgentsApi } from "spacetraders-sdk";

const tokenStore = useTokenStore()
const agentsStore = useAgentsStore()

function useAgentsApi() {
    return new AgentsApi(tokenStore.getConfiguration())
}

export function getMyAgent() {
    return useAgentsApi().getMyAgent()
        .then((response) => {
            agentsStore.setMyAgent(response.data)
        })
}