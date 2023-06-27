<template>
    <div class="debug">
        <button @click="toggleDebug">Debug</button>
        <div>
            <textarea v-show="debugEnabled" v-model="dataJson" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'DebugInfo',
    props: [
        'dataObject'
    ],
    data() {
        return {
            debugEnabled: false
        }
    },
    computed: {
        dataJson() {
            return JSON.stringify(this.dataObject, null, '\t');
        }
    },
    toggleDebug() {
        this.debugEnabled = !this.debugEnabled;
    }
}
</script>

<style></style>