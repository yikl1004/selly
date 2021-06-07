<template>
    <div class="calendar-field">
        <label :for="id" :class="{ ir: hiddenLabel }">{{ label }}</label>
        <div class="input-area" :class="{ focus: focusedClass }">
            <input
                ref="input"
                type="text"
                :value="displayValue"
                :class="{ readonly }"
                @keydown="onKeydown"
                @blur="onBlur"
                @focus="onFocus"
            />
            <i class="icon-calendar" />
            <button v-if="!!displayValue" type="button" class="clear" @click="() => {}">
                <i />
                <span class="ir">전체삭제</span>
            </button>
        </div>
        <div v-if="datepickerVisible" v-click-outside="hideDatepicker" class="dimm" />
        <transition
            mode="out-in"
            enter-active-class="animate__animated animate__bounceInUp"
            leave-active-class="animate__animated animate__bounceOutDown"
        >
            <div v-if="datepickerVisible" v-click-outside="hideDatepicker" class="datepicker-wrapper">
                <date-picker v-model="selected.date" @dayclick="onDayClick"></date-picker>
            </div>
        </transition>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
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
    @Prop({ type: String, required: true })
    readonly id!: string

    /** label태그에 들어갈 텍스트 */
    @Prop({ type: String, default: '', required: true })
    readonly label!: string

    /** label을 비노출여부 */
    @Prop(Boolean)
    readonly hiddenLabel!: boolean

    /** 기본 값 */
    @Prop(Date)
    readonly defaultValue!: Date

    /** 읽기전용 */
    @Prop({ type: Boolean, default: false })
    readonly readonly!: boolean

    /**
     * @category Data(State)
     */

    /** focus 상태 */
    private focusedClass: boolean = false

    /** 실제 값 */
    private value: Date = this.defaultValue || new Date()

    /** 선택된 값 */
    private selected: any = {}

    private datepickerVisible: boolean = false

    /**
     * @category Computed
     */

    /** 화면에 보여질 value */
    get displayValue(): string {
        return dayjs(this.value).format('YYYY.MM.DD')
    }

    @Watch('value')
    changeValue(newValue: Date, oldValue: Date) {
        /**
         * 값이 변경 될때 마다 호출
         * @event change
         */
        this.$emit('change', {
            value: newValue,
            fieldName: this._.camelCase(this.id),
        })
    }

    /**
     * @category Methods
     */

    onKeydown(event: KeyboardEvent) {
        event.preventDefault()
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

        this.datepickerVisible = true
        this.focusedClass = true
    }

    onBlur(event: FocusEvent) {
        this.focusedClass = false
    }

    hideDatepicker() {
        this.datepickerVisible = false
    }

    showDatepicker() {
        this.datepickerVisible = true
    }
}
</script>

<style scoped lang="scss" src="./CalendarField.scss"></style>
