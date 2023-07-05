import { defineStore } from "pinia";
import { Configuration } from "spacetraders-sdk";
import { ref } from "vue";

export const useTokenStore = defineStore('token', () => {
    const baseUrl = ref(import.meta.env.VITE_SPACE_TRADERS_BASE_URL)
    const token = ref('')
    function setToken(newToken: string) {
        token.value = newToken
    }
    function getConfiguration() {
        return new Configuration({
            basePath: baseUrl.value,
            accessToken: token.value
        })
    }
    return { getConfiguration, setToken }
})
