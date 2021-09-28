<template>
    <div class="popup-inner no-padding">
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
                        @click="toggleGuDongList(stateIndex)"
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
                                        :class="[
                                            'btn-map-area',
                                            { active: guItem.selected === 'Y' },
                                        ]"
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
                                    v-for="(dongItem, dongIndex) in dongList"
                                    :key="`dong${dongIndex}`"
                                >
                                    <button
                                        type="button"
                                        :class="[
                                            'btn-map-area',
                                            {
                                                active:
                                                    dongItem.selected === 'Y',
                                            },
                                        ]"
                                    >
                                        {{ dongItem.zonNm }}
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
import { Component, Prop, Vue } from 'vue-property-decorator'
import { AroundSalesModule } from '@stores/modules/aroundSales'

@Component
export default class PopupMapArea extends Vue {
    /** 가맹점 행정동 코드 */
    @Prop({ type: String, default: '' })
    readonly mcAdmdC!: string

    /** 선택된 시/도 리스의 index */
    private currentIndex = -1

    get stateList() {
        return AroundSalesModule.stateList
    }

    get guList() {
        return AroundSalesModule.guList
    }

    /** 주의: 전체 동이 있어서 filtering 해야함 */
    get dongList() {
        return AroundSalesModule.dongList
    }

    /** 선택한 동 리스트  */
    getDongList(highLevel: string) {
        return this.dongList.filter(item => {
            return new RegExp(`${highLevel}`, 'gi').test(item.zonClsDc)
        })
    }

    /**
     * click 토글이벤트 발생
     */
    toggleGuDongList(index: number) {
        /**
         * TODO: 클릭시 포커스 이동(스크롤이동) 액션 여부 확인 필요
         */
        this.currentIndex = this.currentIndex === index ? -1 : index
    }

    async mounted() {
        await AroundSalesModule.getInquiryDistrict({
            mcAdmdC: this.mcAdmdC,
        })

        this.currentIndex = this.stateList.findIndex(
            item => item.selected === 'Y',
        )
    }
}
</script>

<style lang="scss" scoped src="./PopupMapArea.scss"></style>
