<template>
    <div class="recommender-box">
        <CheckBox
            id="recommenderCheck"
            label="추천인이 있으시면 체크해주세요. (선택)"
            @change="openRecommendArea"
        />
        <ButtonField
            v-if="recommendAreaOpen"
            id="recommenderCode"
            label="추천인 코드(선택)"
            placeholder="추천인 코드 입력"
            button-text="확인"
            name="cert"
            :maxlength="9999"
            :hidden-label="true"
            :readonly="false"
            :disabled="false"
            @search="onClickRecommenderCode"
        />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { AuthModule } from '@stores/modules/auth'

@Component
export default class SelectStorePage extends Vue {
    get recommenderCodeMessage() {
        return AuthModule.recommenderCodeMessage
    }

    /** @Data */
    private recommendAreaOpen = false

    /** @Methods */
    /**
     * FIXME: 수정 해야 함
     * 1. 체크박스가 없음(디자인 추가 되어야 함 )
     * 2. API가 명확하지 않음
     * 3. 메세징 처리 (Watch: changeRecommenderCodeMessage 메서드 만들다 말았음)
     */
    async onClickRecommenderCode(rfnSn: string) {
        await AuthModule.inputRecommenderCode({ rfnSn })
    }

    openRecommendArea(event: {
        value?: string
        index: number
        fieldName: string
    }) {
        this.recommendAreaOpen = !!event.value
    }

    /** @Lifecycle */
}
</script>
<style scoped>
.search-field {
    margin-top: 32px;
}
</style>
