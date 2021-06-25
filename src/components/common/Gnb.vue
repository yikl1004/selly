<template>
    <section v-if="show" class="box-gnb-wrap">
        <div class="gnb-header">
            <h2>
                <Anchor href="/" class="logo">
                    <span class="ir">Selly</span>
                </Anchor>
            </h2>
            <button type="button" class="btn-gnb-close" @click="onClose">
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
                    <li v-for="(item, index) in gnbList" :key="`gnb-depth1-${index}`" :class="{ active: index === activeIndex }">
                        {{ typeof index }}
                        <button type="button" @active="onActive(index)">
                            {{ item.name }}
                        </button>
                    </li>
                </ul>
            </div>
            <div class="gnb-2dep-box">
                <div class="gnb-2dep active">
                    <ul>
                        <!-- <li v-for="(child, index) in currentChildren" key="``"></li> -->
                        <!-- <li><Anchor>매출내역</Anchor></li>
                        <li><Anchor>입금내역</Anchor></li> -->
                    </ul>
                </div>

                <!-- <div class="gnb-2dep">
                    <ul>
                        <li><Anchor>금융상품 안내</Anchor></li>
                        <li><Anchor>대출내역</Anchor></li>
                    </ul>
                </div>

                <div class="gnb-2dep">
                    <ul>
                        <li><Anchor>마케팅 안내</Anchor></li>
                        <li><Anchor>마케팅내역</Anchor></li>
                        <li><Anchor>상권분석</Anchor></li>
                    </ul>
                </div>

                <div class="gnb-2dep">
                    <ul>
                        <li><Anchor>매출내역</Anchor></li>
                        <li><Anchor>입금내역</Anchor></li>
                    </ul>
                </div>

                <div class="gnb-2dep">
                    <ul>
                        <li><Anchor>세무서비스 있나없나</Anchor></li>
                    </ul>
                </div>

                <div class="gnb-2dep">
                    <ul>
                        <li><Anchor>회원정보</Anchor></li>
                        <li><Anchor>사업자정보</Anchor></li>
                        <li><Anchor>공지사항</Anchor></li>
                        <li><Anchor>사업자정보</Anchor></li>
                        <li><Anchor>자주 묻는 질문</Anchor></li>
                        <li><Anchor>이용약관</Anchor></li>
                    </ul>
                </div> -->
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { Component, Prop, PropSync, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

interface MenuItem {
    name: string
    path: string
}

const UiModule = namespace('ui')

@Component
export default class Gnb extends Vue {
    /**
     * @category Props
     */

    /** 노출 여부(초기 설정) */
    @Prop({ type: Boolean, default: false, required: true })
    public show!: boolean

    /**
     * @category Data
     */

    private menuList: MenuItem[] = [{ name: '매출', path: '' }]
    private activeIndex: number = 1

    @UiModule.State('gnbList')
    readonly gnbList!: GnbItem[]

    /**
     * @category Computed
     */

    get currentChildren(): GnbItem[] {
        return this.gnbList[this.activeIndex].children || ([] as GnbItem[])
    }

    /**
     * @category Methods
     */

    onClose(event: PointerEvent) {
        /**
         * click 이벤트
         */
        this.$emit('close', event)
    }

    onActive(index: number) {
        this.activeIndex = index
    }
}
</script>

<style scoped lang="scss" src="./Gnb.scss"></style>
