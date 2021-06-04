import axios, { AxiosInstance, AxiosRequestConfig, AxiosTransformer, AxiosAdapter } from 'axios'
import { cacheAdapterEnhancer, throttleAdapterEnhancer } from 'axios-extensions'

import { ResponseAdapterType } from './decorators'

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'
export type SellyServiceResponse<T> = Promise<T | null>

/**
 * @description
 * API 응답 결과 중 "rc, responseCode" 에 대한 설명
 * 0000: success
 * 9999: falil
 */

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

export const instance = axios.create({
    baseURL: process.env.VUE_APP_API_DOMAIN,
    headers: {},
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
