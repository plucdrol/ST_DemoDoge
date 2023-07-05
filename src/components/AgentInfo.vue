<script lang="ts">

import { defineComponent } from 'vue';
import { type Agent } from 'spacetraders-sdk';

export default defineComponent({
    name: 'AgentInfo',
    props: {
        agent: {
            type: Object as () => Agent,
            required: true
        }
    }
})
</script>
<template>
    <div class="agent-info">
        <h2>Agent: {{ agent.symbol }}</h2>
        <div class="info-property">Account ID: {{ agent.accountId }}</div>
        <div class="info-property">Faction: {{ agent.startingFaction }}</div>
        <div class="info-property">HQ: {{ agent.headquarters }}</div>
        <div class="info-property">Credits: {{ agent.credits }}</div>
    </div>
</template>