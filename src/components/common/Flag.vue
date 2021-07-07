<template>
    <span class="flag-box" :class="color">{{ text }}</span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

type Color = 'green' | 'red' | 'brown' | 'gray' | 'blue' | 'white'

@Component
export default class Flag extends Vue {
    /**
     * @category Props
     */
    /** 입력텍스트 */
    @Prop({ type: String })
    readonly text!: string

    /** 디자인 : 컬러 */
    @Prop({ type: String, default: 'green' })
    readonly color!: Color
}
</script>

<style scoped lang="scss" src="./Flag.scss"></style>
