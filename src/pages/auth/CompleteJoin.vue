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
        <portal to="floating">
            <BasicButton size="large" @click="onComplete">
                확인
            </BasicButton>
        </portal>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class CompleteJoinPage extends Vue {
    @Prop({ type: Function, default: () => {}, required: true })
    readonly onComplete!: Function
}
</script>

<style lang="scss" src="./CompleteJoin.scss"></style>
