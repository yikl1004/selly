<template>
    <div class="container">
        <CautionBox type="complete" />

        <div class="complete-store-list">
            <div class="store-box">
                <i>123-456-78912</i>
                <span class="store-name">이층집 갈비</span>
            </div>
            <div class="store-box">
                <i>123-456-78912</i>
                <span class="store-name">이층집 갈비</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class CompleteJoinPage extends Vue {}
</script>

<style lang="scss" src="./CompleteJoin.scss"></style>
