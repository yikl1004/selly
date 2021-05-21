<template>
    <div class="text-field">
        <label :for="id" :class="{ ir: hiddenLabel }">{{ label }}</label>
        <div class="input-area" :class="{ focus: focusedClass }">
            <input ref="input" type="date" />
            <button v-if="!!value.length" type="button" class="clear" @click="clearValue">
                <i />
                <span class="ir">전체삭제</span>
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class CalendarField extends Vue {
    /**
     * @category Refs
     */

    $refs!: Vue['$refs'] & {
        input: HTMLInputElement
    }

    /**
     * @category Props
     */

    /** form에 사용될 id */
    @Prop({ type: String })
    readonly id!: string

    /** label태그에 들어갈 텍스트 */
    @Prop({ type: String, default: '', required: true })
    readonly label!: string

    /** label을 비노출여부 */
    @Prop(Boolean)
    readonly hiddenLabel!: boolean

    /** 기본 값 */
    @Prop(String)
    readonly defaultValue!: string

    /**
     * @category Data(State)
     */

    /** focus 상태 */
    private focusedClass: boolean = false

    /** 실제 값 */
    private value: string = this.defaultValue || ''

    /**
     * @category Methods
     */

    clearValue() {
        this.value = ''
        this.$refs.input.focus()
    }
}
</script>

<style scoped src="./CalendarField.scss"></style>
