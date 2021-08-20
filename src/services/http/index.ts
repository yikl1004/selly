import axios, { AxiosAdapter, AxiosResponse } from 'axios'
import { cacheAdapterEnhancer, throttleAdapterEnhancer } from 'axios-extensions'
import store from '@stores/index'
import router from '@router/index'

declare global {
    type HttpMethod = 'post' | 'get'
    interface API {
        url: string
        method: HttpMethod
    }
}

// 환경변수가 production이 아닌 경우
const isDev = process.env.NODE_ENV !== 'production'

// selly API response
export const axiosInstance = axios.create({
    baseURL: isDev ? process.env.VUE_APP_API_DOMAIN : '/',
    adapter: throttleAdapterEnhancer(cacheAdapterEnhancer(axios.defaults.adapter as AxiosAdapter)),
    withCredentials: true,
})

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

axiosInstance.interceptors.response.use(
    (response): AxiosResponse => {
        const data = response.data

        // 시스템 에러
        if (data.rc === '9999') {
            router.app.$modal.open({
                message: data.rsMsg,
                buttonText: {
                    confirm: '확인',
                },
                confirm: () => {
                    // router.push({ name: 'Main' })
                },
            })
        }

        // 로그인 후 이용
        if (data.rc === '8888') {
            router.push({ name: 'Login' })
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
