<template>
    <div v-click-outside="onBlur" class="calendar-field">
        <label :for="id" :class="{ ir: hiddenLabel }">{{ label }}</label>
        <div class="input-area" :class="{ focus: focusedClass }">
            <input ref="input" type="text" :value="displayValue" :class="{ readonly }" @keydown="onKeydown" @focus="onFocus" />
            <i class="icon-calendar" />
            <button v-if="!!displayValue" type="button" class="clear" @click="() => {}">
                <i />
                <span class="ir">전체삭제</span>
            </button>
        </div>
        <Dimmed :show="datepickerVisible" />
        <transition v-bind="transitionProps.datepicker">
            <div v-if="datepickerVisible" class="datepicker-wrapper">
                <date-picker
                    v-model="value"
                    v-click-outside="hideDatepicker"
                    :masks="{ title: 'YYYY년 M월', navYears: 'YYYY년' }"
                    @dayclick="onDayClick"
                ></date-picker>
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
    private value: Date | null = this.defaultValue || new Date()

    /** datepicker 노출 여부 */
    private datepickerVisible: boolean = false

    /** datepicker 노출 시 transition */
    private transitionProps: { [key: string]: TransitionProps } = {
        datepicker: {
            mode: 'out-in',
            'enter-active-class': 'animate__animated animate__bounceInUp',
            'leave-active-class': 'animate__animated animate__bounceOutDown',
        },
    }

    /**
     * @category Computed
     */

    /** 화면에 보여질 value */
    get displayValue(): string {
        return dayjs(this.value || undefined).format('YYYY.MM.DD')
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
        this.hideDatepicker()
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
        this.showDatepicker()
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

    deleteValue() {
        this.value = null
    }
}
</script>

<style scoped lang="scss" src="./CalendarField.scss"></style>
