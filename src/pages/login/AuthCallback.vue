<template>
    <div></div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import axios from 'axios'
import { AuthModule } from '@stores/modules/auth'
import type { LoginInfo } from '@stores/modules/auth'

@Component
export default class AuthCallbakPage extends Vue {
    get loginInfo() {
        return AuthModule.loginInfoData
    }

    // 로그인 정보에 따라 화면을 이동한다
    @Watch('loginInfo')
    changeLoginInfo(value: LoginInfo /* oldValue: LoginInfo | null */) {
        switch (value?.rspDc) {
            // 최초 회원가입, 사업자확인으로 이동(가입 절차)
            case '01':
                this.$router.push({ name: 'Join', params: { step: '1' } })
                break
            // 기존가입자: 메인으로 이동
            case '02':
                this.$router.push({ name: 'Main' })
                break
            // 가입불가 대상
            case '03':
                this.$router.push({ name: 'Join', params: { step: '-1' } })
                break
            default:
                alert('rspDc 가 null 입니다.')
                break
        }
    }

    async mounted() {
        await this.$nextTick()
        if ('code' in this.$route.query) {
            const code = this.$route.query.code as string
            const state = (this.$route.query.state as string) || undefined
            const makeFormData = (params: { [key: string]: string }) => {
                const searchParams = new URLSearchParams()
                Object.keys(params).forEach(key => {
                    searchParams.append(key, params[key])
                })
                return searchParams
            }
            const data = makeFormData({
                grant_type: 'authorization_code',
                client_id: process.env.VUE_APP_KAKAO_REST_API_KEY,
                redirect_uri: 'http://selly.lottecard.com:8080/authCallback',
                code,
                // client_secret: 'tWLSIRAEqbtjXxrKJj6IWSoIopYUq2kW',
            })

            const res = await axios
                .request({
                    method: 'post',
                    url: 'https://kauth.kakao.com/oauth/token',
                    headers: {
                        'Content-Type':
                            'application/x-www-form-urlencoded;charset=utf-8',
                    },
                    data,
                })
                .then(res => res)
                .catch(error => error)
            console.dir(res)
            if ('response' in res && res.response.status === 400) {
                this.$modal.open({
                    message: '잘못 접근 했습니다.\n로그인으로 이동합니다.',
                    confirm: () => {
                        this.$router.push({ name: 'Login' })
                    },
                    buttonText: {
                        confirm: '확인',
                    },
                })
            } else {
                this.$kakaoSdk.setAccessToken(res.data.access_token)

                // 2. 카카오 로그인 사용자 정보 요청
                const kakaoUserInfoResponse = await this.$kakaoSdk.userInfo(
                    state,
                )
                // 3. 동의한 약관 항목 요청
                const kakaoAgreedList = await this.$kakaoSdk.agreedList()
                // 4. Mutation: Selly 로그인 API 요청 Parameter 세팅
                AuthModule.setUserInfo({
                    ...kakaoUserInfoResponse,
                    ...kakaoAgreedList,
                })
                // 5. Action: Selly 로그인 API 요청
                await AuthModule.getLoginInfo()
            }
        }
    }
}
</script>

<style scoped></style>
