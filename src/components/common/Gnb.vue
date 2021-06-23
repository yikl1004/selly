<template>
    <section v-if="showState" class="box-gnb-wrap">
        <div class="gnb-header">
            <h2>
                <Link href="/" class="logo">
                    <span class="ir">Selly</span>
                </Link>
            </h2>
            <button type="button" class="btn-gnb-close" @click="onClick">
                <span class="ir">메뉴 닫기</span>
            </button>
        </div>
        <div class="user-info">
            <strong class="user-name">김로카님</strong>
            <BasicButton type="textGray">
                로그아웃
            </BasicButton>
        </div>
        <div class="box-gnb-list">
            <div class="gnb-1dep-box">
                <ul>
                    <li class="active">
                        <button type="button">
                            매출/입금
                        </button>
                    </li>
                    <li>
                        <button type="button">
                            금융상품
                        </button>
                    </li>
                    <li>
                        <button type="button">
                            마케팅
                        </button>
                    </li>
                    <li>
                        <button type="button">
                            세무서비스
                        </button>
                    </li>
                    <li>
                        <button type="button">
                            설정
                        </button>
                    </li>
                </ul>
            </div>
            <div class="gnb-2dep-box">
                <div class="gnb-2dep active">
                    <ul>
                        <li><Link>매출내역</Link></li>
                        <li><Link>입금내역</Link></li>
                    </ul>
                </div>

                <div class="gnb-2dep">
                    <ul>
                        <li><Link>금융상품 안내</Link></li>
                        <li><Link>대출내역</Link></li>
                    </ul>
                </div>

                <div class="gnb-2dep">
                    <ul>
                        <li><Link>마케팅 안내</Link></li>
                        <li><Link>마케팅내역</Link></li>
                        <li><Link>상권분석</Link></li>
                    </ul>
                </div>

                <div class="gnb-2dep">
                    <ul>
                        <li><Link>매출내역</Link></li>
                        <li><Link>입금내역</Link></li>
                    </ul>
                </div>

                <div class="gnb-2dep">
                    <ul>
                        <li><Link>세무서비스 있나없나</Link></li>
                    </ul>
                </div>

                <div class="gnb-2dep">
                    <ul>
                        <li><Link>회원정보</Link></li>
                        <li><Link>사업자정보</Link></li>
                        <li><Link>공지사항</Link></li>
                        <li><Link>사업자정보</Link></li>
                        <li><Link>자주 묻는 질문</Link></li>
                        <li><Link>이용약관</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { Component, Prop, PropSync, Vue } from 'vue-property-decorator'

@Component
export default class Gnb extends Vue {
    /**
     * @category Props
     */

    /** 노출 여부(초기 설정) */
    @PropSync('show', { type: Boolean, default: false, required: true })
    public showState!: boolean

    /**
     * @category Methods
     */
    onClick(event: PointerEvent) {
        /**
         * click 이벤트
         */
        this.$emit('click', event)
    }
}
</script>

<style scoped lang="scss" src="./Gnb.scss"></style>
