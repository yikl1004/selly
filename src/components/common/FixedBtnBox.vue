<template>
    <div class="fixed-btn-box">
        <slot />
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class FixedBtnBox extends Vue {}
</script>

<style lang="scss" scoped src="./FixedBtnBox.scss"></style>
