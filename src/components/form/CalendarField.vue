<template>
    <div class="calendar-field">
        <label :for="id" :class="{ ir: hiddenLabel }">{{ label }}</label>
        <date-picker v-model="selected.date" @dayclick="onDayClick">
            <template #default="{ togglePopover, hidePopover }">
                <div class="input-area" :class="{ focus: focusedClass }">
                    <input
                        ref="input"
                        type="text"
                        :readonly="readonly"
                        :value="displayValue"
                        @keydown="onKeydown"
                        @focus="dateSelected($event, value, togglePopover)"
                        @blur="onBlur"
                    />
                    <i class="icon-calendar" @click.stop="togglePopover({ ref: $refs.input })" />
                    <button v-if="!!displayValue" type="button" class="clear" @click="removeDate(value, hidePopover)">
                        <i />
                        <span class="ir">전체삭제</span>
                    </button>
                </div>
            </template>
        </date-picker>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import dayjs from 'dayjs'

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

    /** 읽기전용 */
    @Prop(Boolean)
    readonly readonly!: boolean

    /**
     * @category Data(State)
     */

    /** focus 상태 */
    private focusedClass: boolean = false

    /** 실제 값 */
    private value: Date = new Date()

    /** 선택된 값 */
    private selected: any = {}

    /**
     * @category Computed
     */

    /** 화면에 보여질 value */
    get displayValue(): string {
        return dayjs(this.value).format('YYYY.MM.DD')
    }

    /**
     * @category Methods
     */

    onKeydown(event: KeyboardEvent) {
        event.preventDefault()
    }

    removeDate(date: Date, hide: Function) {
        this.value = new Date()
        // hide()
    }

    dateSelected(event: FocusEvent, date: Date, toggle: Function) {
        this.onFocus(event)
        toggle({ ref: this.$refs.input })
    }

    onDayClick(day: { date: Date }) {
        this.value = day.date
    }

    onClickIcon() {
        this.$refs.input.focus()
    }

    onFocus(event: FocusEvent) {
        /**
         * focus 이벤트
         * @event focus
         */
        this.$emit('focus', event)

        this.focusedClass = true
    }

    onBlur(event: FocusEvent) {
        this.focusedClass = false
    }
}
</script>

<style scoped lang="scss" src="./CalendarField.scss"></style>
