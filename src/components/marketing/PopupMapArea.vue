<template>
    <div class="popup-inner no-padding">
        <div class="popup-map-area">
            <div class="box-acco-list">
                <div :class="['box-acco-item', { active: true }]">
                    <button type="bubton" class="acco-anchor">
                        <strong class="tit">서울</strong>
                    </button>
                    <div class="acco-cont">
                        <div class="acco-cont-inner">
                            <ul class="list-area list-gu">
                                <li>
                                    <button type="button" class="btn-map-area">
                                        강남구
                                    </button>
                                </li>
                                <li>
                                    <button
                                        type="button"
                                        class="btn-map-area active"
                                    >
                                        강남구
                                    </button>
                                </li>
                                <li>
                                    <button type="button" class="btn-map-area">
                                        강남구
                                    </button>
                                </li>
                                <li>
                                    <button type="button" class="btn-map-area">
                                        강남구
                                    </button>
                                </li>
                                <li>
                                    <button type="button" class="btn-map-area">
                                        강남구
                                    </button>
                                </li>
                                <li>
                                    <button type="button" class="btn-map-area">
                                        강남구
                                    </button>
                                </li>
                                <li>
                                    <button type="button" class="btn-map-area">
                                        강남구
                                    </button>
                                </li>
                                <li>
                                    <button type="button" class="btn-map-area">
                                        강남구
                                    </button>
                                </li>
                                <li>
                                    <button type="button" class="btn-map-area">
                                        강남구
                                    </button>
                                </li>
                                <li>
                                    <button type="button" class="btn-map-area">
                                        강남구
                                    </button>
                                </li>
                            </ul>
                            <ul class="list-area list-dong">
                                <li>
                                    <button type="button" class="btn-map-area">
                                        내곡동
                                    </button>
                                </li>
                                <li>
                                    <button type="button" class="btn-map-area">
                                        내곡동
                                    </button>
                                </li>
                                <li>
                                    <button type="button" class="btn-map-area">
                                        내곡동
                                    </button>
                                </li>
                                <li>
                                    <button type="button" class="btn-map-area">
                                        내곡동
                                    </button>
                                </li>
                                <li>
                                    <button type="button" class="btn-map-area">
                                        내곡동
                                    </button>
                                </li>
                                <li>
                                    <button type="button" class="btn-map-area">
                                        내곡동
                                    </button>
                                </li>
                                <li>
                                    <button type="button" class="btn-map-area">
                                        내곡동
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div :class="['box-acco-item', { active: false }]">
                    <button type="bubton" class="acco-anchor">
                        <strong class="tit">서울</strong>
                    </button>
                    <div class="acco-cont">
                        <div class="acco-cont-inner">
                            <ul class="list-area list-gu">
                                <li>
                                    <button type="button" class="btn-map-area">
                                        강남구
                                    </button>
                                </li>
                                <li>
                                    <button type="button" class="btn-map-area">
                                        강남구
                                    </button>
                                </li>
                                <li>
                                    <button type="button" class="btn-map-area">
                                        강남구
                                    </button>
                                </li>
                                <li>
                                    <button type="button" class="btn-map-area">
                                        강남구
                                    </button>
                                </li>
                                <li>
                                    <button type="button" class="btn-map-area">
                                        강남구
                                    </button>
                                </li>
                                <li>
                                    <button type="button" class="btn-map-area">
                                        강남구
                                    </button>
                                </li>
                                <li>
                                    <button type="button" class="btn-map-area">
                                        강남구
                                    </button>
                                </li>
                                <li>
                                    <button type="button" class="btn-map-area">
                                        강남구
                                    </button>
                                </li>
                                <li>
                                    <button type="button" class="btn-map-area">
                                        강남구
                                    </button>
                                </li>
                                <li>
                                    <button type="button" class="btn-map-area">
                                        강남구
                                    </button>
                                </li>
                            </ul>
                            <ul class="list-area list-dong">
                                <li>
                                    <button type="button" class="btn-map-area">
                                        내곡동
                                    </button>
                                </li>
                                <li>
                                    <button type="button" class="btn-map-area">
                                        내곡동
                                    </button>
                                </li>
                                <li>
                                    <button type="button" class="btn-map-area">
                                        내곡동
                                    </button>
                                </li>
                                <li>
                                    <button type="button" class="btn-map-area">
                                        내곡동
                                    </button>
                                </li>
                                <li>
                                    <button type="button" class="btn-map-area">
                                        내곡동
                                    </button>
                                </li>
                                <li>
                                    <button type="button" class="btn-map-area">
                                        내곡동
                                    </button>
                                </li>
                                <li>
                                    <button type="button" class="btn-map-area">
                                        내곡동
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
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class PopupMapArea extends Vue {
    /**
     * @category Data(State)
     */
    /**  */
    private currentIndex = -1

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

<style lang="scss" scoped src="./PopupMapArea.scss"></style>
