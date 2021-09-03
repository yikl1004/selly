<template>
    <Page>
        <PageBody class="floating">
            <div class="intro-box intro01">
                <div class="intro-inner">
                    <h2>바쁜 사장님을 위한<br />슬기로운 사업관리</h2>
                    <ul>
                        <li>매출/입금 알림</li>
                        <li>금융 상품</li>
                        <li>매장홍보쿠폰</li>
                        <li>내 주변 매출</li>
                    </ul>
                </div>
            </div>

            <div class="intro-box intro02">
                <div class="intro-inner">
                    <h3>
                        신용카드, 현금, 배달매출까지<br />매일 카카오톡으로 매출
                        알림 받기
                    </h3>
                    <p>
                        한 번 연동으로 가맹점의 매출 및 입금 정보를<br />편리하게
                        확인해보세요.
                    </p>
                </div>
            </div>

            <div class="intro-box intro03">
                <div class="intro-inner">
                    <h3>
                        많이 번 날 많이 상환하고,<br />적게 번 날 적게
                        상환하며<br />이자 부담을 줄이는 스마트한 금융
                    </h3>
                    <p>
                        서류 준비와 지점 방문 없이<br />당일 신청하고 당일 대출
                        받아보세요.
                    </p>
                </div>
            </div>

            <div class="intro-box intro04">
                <div class="intro-inner">
                    <h3>
                        내 매장 주변 1km 이내 고객만<br />쓸 수 있는 할인 쿠폰
                    </h3>
                    <p>
                        쿠폰을 무료로 발송하고,<br />첫 고객과 단골 고객을
                        늘려보세요.
                    </p>
                </div>
            </div>

            <div class="intro-box intro05">
                <div class="intro-inner">
                    <h3>내 매장 주변 업종의<br />매출 분석하기</h3>
                    <p>
                        주변 가맹점의 매출 추이와 고객 속성을 확인하고,<br />매장
                        홍보에 활용해보세요.
                    </p>
                </div>
            </div>

            <div class="intro-box intro06">
                <div class="intro-inner">
                    <BannerSwiper
                        :options="{
                            slidesPerView: 1,
                            spaceBetween: 20,
                            navigation: {
                                nextEl: '.swiper-button-next',
                                prevEl: '.swiper-button-prev',
                            },
                            loop: true,
                        }"
                        :isNavigation="true"
                    >
                        <swiper-slide>
                            <div class="slide-intro-box">
                                <span class="thumb"> </span>
                                <p>
                                    샐리를 사용하면서<br />주변 가맹점의 매출
                                    추이와 고객 속성을 <br />확인하고, 매장
                                    홍보에 활용하는데 <br />아주 많은 도움을
                                    받았습니다.
                                    <strong>IMT 커피집, 광화문점</strong>
                                </p>
                            </div>
                        </swiper-slide>
                        <swiper-slide>
                            <div class="slide-intro-box">
                                <span class="thumb"> </span>
                                <p>
                                    샐리를 사용하면서<br />주변 가맹점의 매출
                                    추이와 고객 속성을 <br />확인하고, 매장
                                    홍보에 활용하는데 <br />아주 많은 도움을
                                    받았습니다.
                                    <strong>IMT 커피집, 광화문점</strong>
                                </p>
                            </div>
                        </swiper-slide>
                    </BannerSwiper>
                </div>
            </div>

            <button type="button" class="btn-kakao-login" @click="withdraw">
                <span>연결끊기(탈퇴) - 테스트용</span>
            </button>
        </PageBody>
    </Page>
</template>

<script lang="ts">
import { Component, Mixins, Ref, Watch } from 'vue-property-decorator'
import { SwiperSlide } from 'vue-awesome-swiper'

import { CommonModule } from '@stores/modules/common'
import PageView from '@utils/mixins/PageView'
import { AuthModule } from '@stores/modules/auth'
import { AuthResponse } from '@services/auth'

/**
 * TODO: 유쇼데 로그인 버튼만들기
 *
 */
@Component({
    components: {
        SwiperSlide,
    },
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

.btn-kakao-login {
    display: block;
    position: fixed;
    left: 24px;
    right: 24px;
    bottom: 30px;
    width: calc(100% - 48px);
    height: 60px;
    border-radius: 10px;
    background-color: #ffe403;
    font-size: 16px;
    color: #3f1d1d;
    text-align: center;
    font-weight: 500;
    z-index: 1;
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
.container,
.content {
    padding: 0 !important;
}
.intro-box {
    h2,
    h3 {
        font-size: 26px;
        font-weight: 700;
        color: #413a2f;
        line-height: 1.38;
    }
    h3 {
        font-size: 20px;
        line-height: 1.4;
    }
    p {
        margin-top: 12px;
    }
    &.intro01 {
        height: 636px;
        padding: 56px 0 0 0;
        text-align: center;
        background: #f3f0ee url('/assets/intro/img_intro01.png') center bottom
            38px no-repeat;
        background-size: auto 331px;
        ul {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            margin-top: 24px;
        }
        li {
            width: calc(50% - 4px);
            height: 44px;
            margin-top: 8px;
            background: #fff;
            border-radius: 8px;
            line-height: 44px;
            color: #6c625a;
            font-weight: 500;
            &:nth-child(-n + 2) {
                margin-top: 0;
            }
        }
    }

    &.intro02 {
        height: 496px;
        padding-top: 60px;
        background: url('/assets/intro/img_intro02.png') center bottom no-repeat;
        background-size: auto 300px;
    }
    &.intro03 {
        height: 544px;
        padding-top: 80px;
        background: url('/assets/intro/img_intro03.png') center bottom no-repeat;
        background-size: auto 300px;
    }

    &.intro04 {
        height: 516px;
        padding-top: 80px;
        background: url('/assets/intro/img_intro04.png') center bottom no-repeat;
        background-size: auto 300px;
    }

    &.intro05 {
        height: 516px;
        padding-top: 80px;
        background: url('/assets/intro/img_intro05.png') center bottom no-repeat;
        background-size: auto 300px;
    }
    &.intro06 {
        height: 454px;
        padding-top: 40px;
        background: #f8f8f8;
        &::v-deep .swiper {
            width: 100%;
            margin: 0;
            padding: 0;
            .swiper-pagination {
                display: none;
            }
            .swiper-button-next,
            .swiper-button-prev {
                &:after {
                    content: '';
                    display: block;
                    width: 24px;
                    height: 24px;
                    font-family: 'Spoqa Han Sans Neo';
                    background-repeat: no-repeat;
                }
            }

            .swiper-button-next:after {
                background-image: url('/assets/intro/btn_arrow_right.svg');
            }
            .swiper-button-prev:after {
                background-image: url('/assets/intro/btn_arrow_left.svg');
            }
        }
    }
}
.slide-intro-box {
    .thumb {
        display: block;
        width: 80px;
        height: 80px;
        margin: 0 auto;
        border-radius: 50%;
        background: green;
        img {
            width: 100%;
        }
    }
    p {
        margin-top: 32px;
        text-align: center;
        strong {
            display: block;
            margin-top: 12px;
            color: #222;
            font-weight: 500;
        }
    }
}
.intro-inner {
    max-width: 360px;
    margin: 0 auto;
    padding: 0 24px;
}
</style>
