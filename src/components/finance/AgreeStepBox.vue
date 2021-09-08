<template>
    <div class="agree-step-box">
        <div class="agree-count"><strong>1</strong>/2</div>
        <div v-if="isAll" class="btn-all-box">
            <BasicButton type="small">전체동의서 확인</BasicButton>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class AgreeStepBox extends Vue {
    @Prop({ type: Boolean, default: false })
    readonly isAll!: boolean
}
</script>

<style scoped lang="scss" src="./AgreeStepBox.scss" />
