import axios, { AxiosTransformer, AxiosAdapter } from 'axios'
import { cacheAdapterEnhancer, throttleAdapterEnhancer } from 'axios-extensions'

declare global {
    type HttpMethod = 'post' | 'get'
    interface API {
        url: string
        method: HttpMethod
    }
}

const isDev = process.env.NODE_ENV !== 'production'

const getTransformResponse = (): AxiosTransformer => {
    return (data: string) => {
        try {
            const _data = JSON.parse(data)
            return {
                ..._data,
            }
        } catch (error) {
            return {}
        }
    }
}

export const axiosInstance = axios.create({
    baseURL: isDev ? process.env.VUE_APP_API_DOMAIN : '/',
    adapter: throttleAdapterEnhancer(
        cacheAdapterEnhancer(axios.defaults.adapter as AxiosAdapter),
    ),
    transformResponse: getTransformResponse(),
    withCredentials: true,
})
