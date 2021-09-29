<template>
    <div ref="scrollContainer" class="popup-inner no-padding">
        <div class="popup-map-area">
            <div class="box-acco-list">
                <div
                    v-for="(stateItem, stateIndex) in stateList"
                    :key="`state${stateIndex}`"
                    :class="[
                        'box-acco-item',
                        { active: stateIndex === currentIndex },
                    ]"
                >
                    <button
                        type="bubton"
                        class="acco-anchor"
                        @click="
                            toggleGuDongList($event, stateIndex, stateItem.zonC)
                        "
                    >
                        <strong class="tit">{{ stateItem.zonNm }}</strong>
                    </button>
                    <div class="acco-cont">
                        <div class="acco-cont-inner">
                            <ul
                                v-if="!!guList.length"
                                class="list-area list-gu"
                            >
                                <li
                                    v-for="(guItem, guIndex) in guList"
                                    :key="`gu${guIndex}`"
                                >
                                    <!-- 활성화 클래스: active -->
                                    <button
                                        type="button"
                                        class="btn-map-area"
                                        :class="{
                                            active: currentGu === guItem.zonC,
                                        }"
                                        @click="onClickGu(guItem.zonC)"
                                    >
                                        {{ guItem.zonNm }}
                                    </button>
                                </li>
                            </ul>
                            <ul
                                v-if="!!dongList.length"
                                class="list-area list-dong"
                            >
                                <li
                                    v-for="(dItem, dIndex) in dongList"
                                    :key="`dong${dIndex}`"
                                >
                                    <button
                                        type="button"
                                        class="btn-map-area"
                                        :class="{
                                            active: currentDong === dItem.zonC,
                                        }"
                                        @click="onClickDong(dItem.zonC)"
                                    >
                                        {{ dItem.zonNm }}
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Ref, Vue } from 'vue-property-decorator'
import { AroundSalesModule } from '@stores/modules/aroundSales'

@Component
export default class PopupMapArea extends Vue {
    /** 가맹점 행정동 코드 */
    @Prop({ type: String, default: '' })
    readonly mcAdmdC!: string

    /** 리스트가 스크롤 되는 영역 - container */
    @Ref('scrollContainer') scrollContainer!: HTMLDivElement

    /** 선택된 시/도 목록의 index */
    private currentIndex = -1
    /** 선택된 시/군/구 목록의 zonC */
    private currentGu = ''
    /** 선택된 읍/면/동 목록의 zonC */
    private currentDong = ''

    /** 시/도 단위 리스트 */
    get stateList() {
        return AroundSalesModule.stateList
    }

    /** 시/군/구 단위 리스트 */
    get guList() {
        return AroundSalesModule.guList
    }

    /** 주의: 전체 동이 있어서 filtering 해야함 */
    get dongList() {
        return AroundSalesModule.dongList.filter(item => {
            return new RegExp(`^${this.currentGu}`, 'gi').test(item.zonC)
        })
    }

    /** 시/군/구 선택 */
    onClickGu(value: string) {
        if (value !== this.currentGu) {
            this.currentGu = value
            this.currentDong = ''
        }
    }

    /** 읍/면/동 선택 */
    onClickDong(value: string) {
        this.currentDong = value
    }

    /** click 토글이벤트 발생 */
    async toggleGuDongList(event: MouseEvent, index: number, zonC: string) {
        console.log(event)
        this.currentIndex = this.currentIndex === index ? -1 : index
        await this.delay(50)
        await this.scrollToSelected(event.target as HTMLButtonElement)
    }

    /** 선택한 목록의 위치로 스크롤 이동 */
    async scrollToSelected(target: HTMLButtonElement): Promise<void> {
        return await new Promise((resolve, reject) => {
            const parent = target.parentElement as HTMLDivElement
            console.log(parent.offsetTop)
            this.scrollContainer.scrollTo({
                behavior: 'smooth',
                left: 0,
                top:
                    this._.toNumber(parent?.offsetTop) -
                    this._.toNumber(target?.clientHeight) -
                    1,
            })
            resolve()
        })
    }

    /** 기본 값 세팅 */
    async initialize() {
        // 행정도 코드 기준 리스트 조회
        await AroundSalesModule.getInquiryDistrict({
            mcAdmdC: this.mcAdmdC,
        })

        /** 시/도 단위 index 값 */
        this.currentIndex = this.stateList.findIndex(
            item => item.selected === 'Y',
        )

        /** 행정동 코드가 존재 하면 */
        if (this.mcAdmdC) {
            // 시/군/구 단위 코드 세팅
            this.currentGu =
                this.guList.find(item => item.selected === 'Y')?.zonC || ''
            // 읍/면/동 단위 코드 세팅
            this.currentDong =
                this.dongList.find(item => item.selected === 'Y')?.zonC || ''
        }
    }

    async mounted() {
        await this.initialize()
    }
}
</script>

<style lang="scss" scoped src="./PopupMapArea.scss"></style>
