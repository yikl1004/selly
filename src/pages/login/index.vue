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
                    @click="bisinessManLoanLogin"
                >
                    <span>사업자 대출 - 카드: N, 정회원</span>
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
                    @click="immediatelyLoanLogin"
                >
                    <span>즉시대출</span>
                </button>
                <button type="button" class="btn-kakao-login" @click="withdraw">
                    <span>연결끊기(탈퇴) - 테스트용</span>
                </button>
            </div>
        </PageBody>
    </Page>
</template>

<script lang="ts">
import { Component, Mixins, Watch } from 'vue-property-decorator'
import { AuthModule, LoginInfo } from '@stores/modules/auth'
import { CommonModule } from '@stores/modules/common'
import PageView from '@utils/mixins/PageView'

@Component({
    beforeRouteEnter(to, from, next) {
        const alreadyLogin = CommonModule.loginExtendInfoData?.rc === '0000'
        next(alreadyLogin ? { name: 'Main' } : undefined)
    },
})
export default class LoginPage extends Mixins(PageView) {
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

    /** @category Methods */

    async login(ciNo?: string) {
        /**
         * 로그인 창을 띄웁니다.
         * @reference https://developers.kakao.com/docs/latest/ko/reference/rest-api-reference
         */

        // 1. 카카오 로그인 요청
        await this.$kakaoSdk.login()
        // 2. 카카오 로그인 사용자 정보 요청
        const kakaoUserInfoResponse = await this.$kakaoSdk.userInfo(ciNo)
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

    // 즉시대출
    immediatelyLoanLogin() {
        this.login('TESTCIJ')
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
