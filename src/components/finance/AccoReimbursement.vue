<template>
    <!--[D] type month는 케이스용 prop / v-if 바꿔도 됨-->
    <div class="box-acco-list" :class="type">
        <div v-for="(item, index) in list" :key="`acco-item-${index}`" :class="['box-acco-item', { active: index === currentIndex }]">
            <button
                type="bubton"
                class="acco-anchor"
                :aria-controls="`acco-item-${index}`"
                :aria-expanded="index === currentIndex ? 'true' : 'false'"
                @click="onClick(index)"
            >
                <em class="date-box">
                    <strong v-if="type">3월</strong>
                    <span>{{ item.date }}</span>
                </em>
                <strong class="price">834,000원</strong>
            </button>
            <div :id="`acco-item-${index}`" class="acco-cont">
                <div class="acco-cont-inner">
                    <!--[D] 중도상환케이스-->
                    <div v-if="type" class="billing-amount-box">
                        <div class="date">
                            21. 07. 01 가상계좌
                        </div>
                        <div class="billing-amount">
                            <strong class="tit">청구금액</strong>
                            <em>911,500원</em>
                        </div>
                    </div>
                    <!--// [D] 중도상환케이스-->
                    <InfoList :list="infoList" />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

interface List {
    date: string
    price: string
}

@Component
export default class AccoReimbursement extends Vue {
    private infoList = [
        {
            title: '이번 달 청구금액',
            desc: '65,170원',
        },
    ]
    /**
     * @category Props
     */

    /** 아코디언 제목과 내용 배열로 받음 */
    @Prop({ type: Array, default: () => [], required: true })
    readonly list!: List[]

    @Prop({ type: String, default: '' })
    readonly type!: string

    /**
     * @category Data(State)
     */
    /**  */
    private currentIndex: number = -1

    /**
     * @category Methods
     */
    onClick(index: number) {
        /**
         * click 토글이벤트 발생
         */
        /**
         * TODO : 클릭시 포커스 이동(스크롤이동) 액션 여부 확인 필요
         */
        this.currentIndex = this.currentIndex === index ? -1 : index
    }
}
</script>

<style lang="scss" scoped src="./AccoReimbursement.scss"></style>
