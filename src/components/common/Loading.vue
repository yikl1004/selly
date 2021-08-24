<template>
    <div class="loading-wrapper">
        <div class="dim"></div>
        <div class="loading">
            <img src="/assets/icon/ico_loading.svg" alt="로딩중" />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Loading extends Vue {}
</script>

<style scoped lang="scss">
.loading-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    .dim {
        background-color: rgba(255, 255, 255, 0.6);
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1000;
    }
}

.loading {
    position: relative;
    z-index: 2000;
    width: 96px;
    height: 96px;
}
</style>
