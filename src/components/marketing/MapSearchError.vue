<template>
    <div class="map-search-error">
        <p>
            일시적으로 지역 정보를 불러올 수 없습니다.<br />팝업을 닫고 다시
            시도해 주세요.
        </p>
        <BasicButton type="small">다시 시도</BasicButton>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class MapSearchError extends Vue {}
</script>

<style scoped lang="scss" src="./MapSearchError.scss"></style>
