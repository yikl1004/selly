<template>
    <div class="box-step">
        <ul>
            <li v-for="(step, index) in count" :key="`step-count-${index}`" :class="{ active: step === active }">
                <span>
                    {{ step }}
                </span>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Tab extends Vue {
    /** 총 스텝 단계 */
    @Prop({ type: Number })
    readonly count!: number

    /** 활성화 index */
    @Prop({ type: Number })
    readonly active!: number
}
</script>

<style lang="scss" src="./Step.scss"></style>
