v
<template>
    <div class="box-progress-bar">
        <span class="progress-bar" :style="style"></span>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

export interface ProgressProps {
    progressNumber: number
}

@Component
export default class ProgressBar extends Vue {
    /**
     * @category Prop
     */

    /** 상태바 진행도 그래프 */
    @Prop({ type: Number, default: 0 })
    readonly progressNumber!: number

    get style() {
        return {
            width: `${this.progressNumber}%`,
        }
    }
}
</script>

<style scoped lang="scss" src="./ProgressBar.scss"></style>
