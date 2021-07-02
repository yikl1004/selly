<template>
    <div class="layout-none">
        <slot />
        <FixedBtnBox />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class NoneLayout extends Vue {}
</script>

<style scoped></style>
