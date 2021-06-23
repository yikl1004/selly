<template>
    <div class="caution-box" :class="type">
        <i class="icon-caution"></i>
        <div class="caution-text-box">
            <strong class="caution-title">prop 받을때 br도 받을수있게 처리필요</strong>
            <p class="caution-sub-txt">
                prop 받을때 br도 받을수있게 처리필요
            </p>
            <!-- ~이용이 어려운 상황입니다.일때 나오는 전화번호 안내 박스 -->
            <div class="tel-box">
                <p>대출 상담시간 09:00 ~ 18:00 (영업일)</p>
                <a href="tel:1577-3355" class="link-tel">1588-8100</a>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class CautionBox extends Vue {
    /**
     * @category Props
     */

    /** 아이콘 타입받음. complete / caution */
    @Prop({ type: String, default: 'complete' })
    readonly type!: string

    /**
     * @category Data(State)
     */
    /**  */
    private currentIndex: number = -1

    /**
     * @category Methods
     */
}
</script>

<style lang="scss" scoped src="./CautionBox.scss"></style>
