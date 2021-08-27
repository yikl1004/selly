<template>
    <Page>
        <PageBody>
            <div class="page-login-wrap">
                <div
                    style="
                        height: 500px;
                        background: #2b2b2b;
                        text-align: center;
                        line-height: 500px;
                    "
                >
                    상단 비주얼 추가 작업 예정
                </div>
                <!-- <button
                    type="button"
                    class="btn-kakao-login"
                    @click="() => login()"
                >
                    <span>카카오톡으로 시작</span>
                </button> -->
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
                <button type="button" class="btn-kakao-login" @click="withdraw">
                    <span>연결끊기(탈퇴) - 테스트용</span>
                </button>
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
import { AuthModule } from '@stores/modules/auth'
import { AuthResponse } from '@services/auth'

/**
 * TODO: 유쇼데 로그인 버튼만들기
 *
 */
@Component({
    beforeRouteEnter(to, from, next) {
        const alreadyLogin = CommonModule.loginExtendInfoData?.rc === '0000'
        next(alreadyLogin ? { name: 'Main' } : undefined)
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
            this.$edkHost.signUpBznav({
                bznavSyncToken: this.$route.query.bzNavToken as string,
            })
            this.$edkHost.signInBznav({
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
    padding: 0 24px 60px;
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
