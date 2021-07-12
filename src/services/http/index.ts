import axios, { AxiosTransformer, AxiosAdapter } from 'axios'
import { cacheAdapterEnhancer, throttleAdapterEnhancer } from 'axios-extensions'

declare global {
    type HttpMethod = 'post' | 'get'
    interface API {
        url: string
        method: HttpMethod
    }
}

const getTransformResponse = (): AxiosTransformer => {
    return (data: any) => {
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
    baseURL: process.env.VUE_APP_API_DOMAIN,
    headers: {},
    adapter: throttleAdapterEnhancer(cacheAdapterEnhancer(axios.defaults.adapter as AxiosAdapter)),
    transformResponse: getTransformResponse(),
    withCredentials: true,
})
