import axios, { AxiosTransformer, AxiosAdapter, AxiosResponse } from 'axios'
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
    adapter: throttleAdapterEnhancer(cacheAdapterEnhancer(axios.defaults.adapter as AxiosAdapter)),
    transformResponse: getTransformResponse(),
    withCredentials: true,
})

axiosInstance.interceptors.request.use(
    requestConfig => {
        console.log('interceptors - request - onFullfiled')
        store.commit('ui/setLoading', true)
        return requestConfig
    },
    error => {
        store.commit('ui/setLoading', false)
        console.log('interceptors - request - onReject', error)
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

        // FIXME: 로그인 후 이용해 주세요(수정해야 할 수 도 있음)
        if (data.rc === '8888' && response.config.url !== '/API/CMN/SECMNFA001') {
            router.push({ name: 'Login' })
            // local-storage 삭제
            localStorage.removeItem('auth')
        }

        store.commit('ui/setLoading', false)
        return response
    },
    error => {
        store.commit('ui/setLoading', false)
        console.log('interceptors - response - onReject', error)
    },
)
