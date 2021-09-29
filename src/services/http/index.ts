import axios, { AxiosAdapter, AxiosResponse } from 'axios'
import { cacheAdapterEnhancer, throttleAdapterEnhancer } from 'axios-extensions'
import store from '@stores/index'
import router from '@router/index'
import { Path } from '@router/routes'

declare global {
    type HttpMethod = 'post' | 'get'
    interface API {
        url: string
        method: HttpMethod
    }
}

/** 환경변수가 production이 아닌 경우 */
const isDev = process.env.NODE_ENV !== 'production'

/**
 * @description
 * createApi 로 생성한 리스트 타입
 */
export type APIList<T extends string | number | symbol> = Record<T, API>

/** API 객체 생성 */
export const createApi = (url: string, method?: 'get' | 'post'): API => ({
    url,
    method: method || 'post',
})

/** selly API response */
export const axiosInstance = axios.create({
    baseURL: isDev ? process.env.VUE_APP_SITE_DOMAIN : '/',
    adapter: throttleAdapterEnhancer(cacheAdapterEnhancer(axios.defaults.adapter as AxiosAdapter)),
    withCredentials: true,
})

/** axios interceptor: REQUEST */
axiosInstance.interceptors.request.use(
    requestConfig => {
        store.commit('ui/setLoading', true)
        return requestConfig
    },
    error => {
        store.commit('ui/setLoading', false)
        return error
    },
)

/** axios interceptor: RESPONSE */
axiosInstance.interceptors.response.use(
    response => {
        const data = response.data

        // 시스템 에러
        if (data.rc === '9999') {
            router.app.$modal.open({
                message: data.rsMsg,
                buttonText: {
                    confirm: '확인',
                },
                confirm: () => {
                    // router.push(Path.Main)
                },
            })
        }

        // 로그인 후 이용
        if (data.rc === '8888') {
            router.push(Path.Login)
            // local-storage 삭제
            localStorage.removeItem('auth')
        }

        store.commit('ui/setLoading', false)
        return response
    },
    error => {
        store.commit('ui/setLoading', false)
        return error
    },
)
