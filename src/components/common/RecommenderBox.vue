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
            hidden-label
            :maxlength="9999"
            :readonly="false"
            :disabled="false"
            @search="onSearch"
        />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class RecommenderBox extends Vue {
    private recommendAreaOpen = false

    onSearch(value: string) {
        console.log('onSearch', value)
        /**
         * @event search
         */
        this.$emit('search', value)
    }

    openRecommendArea({
        value,
    }: /* index,
        fieldName, */
    {
        value?: string
        index: number
        fieldName: string
    }) {
        this.recommendAreaOpen = !!value
        /**
         * @event check
         */
        this.$emit('check', value)
    }
}
</script>
<style scoped>
.search-field {
    margin-top: 32px;
}
</style>
