<!-- TODO list factions -->
<template>
    <div class="register">
        <h1>Recruitment</h1>
        <input type="text" v-model="symbol" placeholder="symbol" />
        <input type="text" v-model="faction" placeholder="faction" />
        <button @click="register">Register</button>
        <textarea class="json-result" v-model="registerResult" />
    </div>
</template>

<script>
export default {
    name: 'RecruitmentStation',
    data() {
        return {
            symbol: process.env.VUE_APP_SYMBOL,
            faction: '',
            registerResultJson: 'Not registered yet'
        }
    },
    computed: {
        registerResult() {
            return JSON.stringify(this.registerResultJson, null, '\t');
        }
    },
    methods: {
        async register() {
            this.registerResultJson = await fetch('https://api.spacetraders.io/v2/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    symbol: this.symbol,
                    faction: this.faction
                })
            })
                .then(response => response.json())
                .catch(error => console.error('Error (register):', error));
        },
    }
}
</script>

<style></style>