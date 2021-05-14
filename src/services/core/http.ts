import axios, { AxiosInstance, AxiosRequestConfig, AxiosTransformer, AxiosAdapter } from 'axios'
import { cacheAdapterEnhancer, throttleAdapterEnhancer } from 'axios-extensions'

import { ResponseAdapterType } from './decorators'

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'
export type SellyServiceResponse<T> = Promise<T | null>

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

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8'
axios.defaults.headers.post['Axxwss-Control-Allow-Origin'] = '*'
export const instance = axios.create({
    baseURL: process.env.VUE_APP_API_DOMAIN || 'http://localhost:3000',
    headers: {
        'Cache-Control': 'no-cache',
    },
    adapter: throttleAdapterEnhancer(cacheAdapterEnhancer(axios.defaults.adapter as AxiosAdapter)),
    transformResponse: getTransformResponse(),
    withCredentials: true,
})

export class HttpService {
    private readonly instance: AxiosInstance = instance

    public async request<T>(config: AxiosRequestConfig, responseAdapter?: ResponseAdapterType): Promise<T> {
        const { transformResponse: defaultTransformResponse } = this.instance.defaults
        const transformResponse: AxiosTransformer[] = [defaultTransformResponse as AxiosTransformer]

        if (responseAdapter) {
            transformResponse.push(responseAdapter)
        }

        const response = await this.instance.request<T>({
            ...config,
            transformResponse,
        })
        return response.data
    }
}
