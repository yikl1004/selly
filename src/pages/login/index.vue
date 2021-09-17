<template>
    <Page>
        <PageBody>
            <div class="page-login-wrap">
                <LoginVisual />
                <div class="btn-box">
                    <!-- <button type="button" class="btn-kakao-login" @click="login">
                    <span>카카오톡으로 시작</span>
                </button> -->
                    <button
                        type="button"
                        class="btn-kakao-login"
                        @click="testLogin(0)"
                    >
                        <span>사업자 1</span>
                    </button>
                    <button
                        type="button"
                        class="btn-kakao-login"
                        @click="testLogin(1)"
                    >
                        <span>사업자 2 로카머니비즈니스카드 보유</span>
                    </button>
                    <button
                        type="button"
                        class="btn-kakao-login"
                        @click="testLogin(2)"
                    >
                        <span>사업자 3</span>
                    </button>
                    <button
                        type="button"
                        class="btn-kakao-login"
                        @click="testLogin(3)"
                    >
                        <span>사업자 4</span>
                    </button>
                    <button
                        type="button"
                        class="btn-kakao-login"
                        @click="testLogin(4)"
                    >
                        <span>사업자 5 로카머니비즈니스카드 보유</span>
                    </button>
                    <button
                        type="button"
                        class="btn-kakao-login"
                        @click="marketingLogin"
                    >
                        <span>마케팅 신청용 로그인</span>
                    </button>
                    <button
                        type="button"
                        class="btn-kakao-login"
                        @click="datusLogin"
                    >
                        <span>유쇼데 로그인 - 비즈론 - 카드: Y, 정회원</span>
                    </button>
                    <button
                        type="button"
                        class="btn-kakao-login"
                        @click="bizloanLogin"
                    >
                        <span>비즈론 - 카드: Y, 정회원</span>
                    </button>
                    <button
                        type="button"
                        class="btn-kakao-login"
                        @click="normalCardLoanLogin"
                    >
                        <span>일반카드론 - 카드: Y, 준회원</span>
                    </button>
                    <button
                        type="button"
                        class="btn-kakao-login"
                        @click="bisinessManLoanLogin"
                    >
                        <span>사업자 대출 - 카드: N, 정회원</span>
                    </button>
                    <button
                        type="button"
                        class="btn-kakao-login"
                        @click="immediatelyLoanLogin"
                    >
                        <span>즉시대출 - 카드: N, 준회원</span>
                    </button>
                    <button
                        type="button"
                        class="btn-kakao-login"
                        @click="clientLogin"
                    >
                        <span> 담당자 로그인용 </span>
                    </button>
                    <button
                        type="button"
                        class="btn-kakao-login"
                        @click="withdraw"
                    >
                        <span>연결끊기(탈퇴) - 테스트용</span>
                    </button>
                </div>
            </div>
            <form
                v-if="datusLoginInfo"
                ref="datusForm"
                :action="datusLoginInfo.data.url"
                method="post"
            >
                <input
                    type="hidden"
                    name="encdata"
                    :value="datusLoginInfo.data.encdata"
                />
                <input
                    type="hidden"
                    name="token"
                    :value="datusLoginInfo.data.token"
                />
            </form>
        </PageBody>
    </Page>
</template>

<script lang="ts">
import { Component, Mixins, Ref, Watch } from 'vue-property-decorator'
import { CommonModule } from '@stores/modules/common'
import PageView from '@utils/mixins/PageView'
import LoginVisual from '@components/login/LoginVisual.vue'
import { AuthModule } from '@stores/modules/auth'
import type { AuthResponse } from '@services/auth'

/**
 * TODO: 유쇼데 로그인 버튼만들기
 *
 */
@Component({
    beforeRouteEnter(to, from, next) {
        const alreadyLogin = CommonModule.loginExtendInfoData?.rc === '0000'
        next(alreadyLogin ? { name: 'Main' } : undefined)
    },
    components: {
        LoginVisual,
    },
})
export default class LoginPage extends Mixins(PageView) {
    @Ref('datusForm') datusForm!: HTMLFormElement

    private token = ''

    get datusLoginInfo() {
        return AuthModule.datusLoginInfoData
    }

    @Watch('datusLoginInfo')
    changeDatusLoginInfo(value: AuthResponse['datusLoginInfo']) {
        if (value.data.rspDc === '01') {
            this.$nextTick().then(() => {
                ;(this.$refs.datusForm as HTMLFormElement).submit()
            })
        }
    }

    /** @category Methods */

    async login(ciNo?: string) {
        /**
         * 로그인 창을 띄웁니다.
         * @reference https://developers.kakao.com/docs/latest/ko/reference/rest-api-reference
         */

        // 0. 카카오 인가 코드 요청
        await this.$kakaoSdk.authorize(ciNo)
    }

    /**
     * LOCA 2.0 앱 웹뷰에서 넘어 올때...
     */
    biznavAutoLogin() {
        // bzNavToken // 비즈넵토큰
        if ('bzNavToken' in this.$route.query) {
            this.$edkHost.syncBznav({
                bznavSyncToken: this.$route.query.bzNavToken as string,
            })
        }
        // mrktPsyn    // 마케팅 메뉴 노출여부
        // dgnm    // 사용자 이름
    }

    // FIXME: 임시 사용, 삭제 요망
    withdraw() {
        this.$kakaoSdk && this.$kakaoSdk.unlink()
    }

    testLogin(seq: number) {
        const ciList = [
            '+TSL1BTyCjo13Chruu2HTH5taSTurksOXXo/9kvp+q1xAU/kir2t7jHakNw19MRsqrYGfxTT4zf5VeE8BpvQ6A==', // (통테 데이터 1)
            '5+6JWxfnXJ8xEh0Q4AbRg4CGimO3DJaF8zUzucazKxQEQaRcifWz9udk7RUpHTeUzXWy0qu4rAPfYZLeMRBv/w==', // (통테 데이터 2 로카머니비즈니스카드 보유)
            '8h15IuxC6ZmGKxyC/0W2q2qWBQ63S3jyyQ+lJ1NvHIcgjZje2PjabO7hymj6wTfPS+mVLkjrzfEfLjTrkl93Kw==', // (통테 데이터 3)
            'cILvcjFICNJrQXm2SUcou+6c6G+htoP3wsFPkWbn0kR/JVH2kyn0xbXW2ew4dOfAMcwntnNJ9AL3jX9Q+FzmKA==', // (통테 데이터 4)
            'RE2YOKb1fSr/FNgGzTXGkwJYmk1RCO5SN6LdJRKp6CxbDqsVpJHQ3urPQ1oMabDPuZgxDMRuEQz2B3M0mADj5Q==', // (통테 데이터 5 로카머니비즈니스카드 보유)
        ]
        this.login(ciList[seq])
    }
    // 담당자 CI
    clientLogin() {
        this.login(
            'DT9gAb26j9GdVAGYi8hucNE3U8+hudoZYPTGXkGDW5ZHe8g6GwIIiLwE1i5AwbJ54DVC73c7YZp2Wxp0aAhYwg==',
        )
    }
    // 마케팅 스템 통과 가능 CI
    marketingLogin() {
        this.login(
            '+TSL1BTyCjo13Chruu2HTH5taSTurksOXXo/9kvp+q1xAU/kir2t7jHakNw19MRsqrYGfxTT4zf5VeE8BpvQ6A==',
        )
    }

    // 비즈론 대상(카드 Y, 정회원)
    bizloanLogin() {
        this.login(
            'tW32CogXmF3XpJALGO0chO7y39u7d6SW6rQ0DWsDXHiAlTzBo58sWO8gZLtVtrXQcV5/OesFnMuugmgBUWZI6g==',
        )
    }

    // 일반카드론(카드 Y, 준회원)
    normalCardLoanLogin() {
        this.login(
            '9F1R6htEBjzWzedR/LADOZ5ImcgLtA9bYJ+Oko7lehTjBb0gqPyQh6VeyIn6mRvWonmbkdPZFxp2ihIBdgcIXg==',
        )
    }

    // 사업자대출 대상(카드 N, 정회원)
    bisinessManLoanLogin() {
        this.login(
            '+r/s3HjBSHosl0NyLj1F8+TlogEFjBwJxt07lpPkN4zXDWYQ+N73rJdOCVM8+4anTlk5P+A3pWZqv+THfPiWQQ==',
        )
    }

    // 즉시대출 대상(카드 N, 준회원)
    immediatelyLoanLogin() {
        this.login('TESTCIJ')
    }

    // 유쇼데 로그인
    datusLogin() {
        AuthModule.getDatusLoginInfo({
            ciNo:
                'tW32CogXmF3XpJALGO0chO7y39u7d6SW6rQ0DWsDXHiAlTzBo58sWO8gZLtVtrXQcV5/OesFnMuugmgBUWZI6g==',
            chnlC: 'DATU',
        })
    }
}
</script>

<style scoped lang="scss">
.page-login-wrap {
    .btn-box {
        padding: 0 20px 60px; //임시
    }
    .btn-kakao-login {
        display: block;
        width: 100%;
        height: 60px;
        border-radius: 10px;
        background-color: #ffe403;
        font-size: 16px;
        color: #3f1d1d;
        text-align: center;
        font-weight: 500;
        span {
            display: inline-block;
            position: relative;
            padding-left: 38px;
            &:before {
                content: '';
                display: block;
                position: absolute;
                left: 0;
                top: 50%;
                width: 36px;
                height: 36px;
                margin-top: -18px;
                background: url('/assets/icon/icon-kakao.svg') no-repeat;
            }
        }
    }
}
</style>
