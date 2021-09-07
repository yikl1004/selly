<template>
    <div
        v-click-outside="onBlur"
        class="calendar-field field-box"
        :class="type"
    >
        <LabelTitle :hidden-label="hiddenLabel" :label="label" />
        <div class="flex">
            <div class="input-area" :class="{ focus: focusedClass }">
                <!--[D] 기간 범위선택(range 적용)시 date format yy.mm.dd ~ yy.mm.dd -->
                <input
                    ref="input"
                    type="text"
                    :value="displayValue"
                    :class="{ readonly }"
                    @keydown="onKeydown"
                    @focus="onFocus"
                />
                <i v-if="!isRange" class="icon-calendar" />
            </div>
        </div>
        <transition
            mode="out-in"
            enter-active-class="animate__animated animate__bounceInUp"
            leave-active-class="animate__animated animate__bounceOutDown"
        >
            <div v-if="datepickerVisible" class="datepicker-wrapper">
                <date-picker
                    v-model="value"
                    v-click-outside="hideDatepicker"
                    is-expanded
                    :min-date="minDate"
                    :max-date="maxDate"
                    :is-range="isRange"
                    :masks="{ title: 'MM월 YYYY', navYears: 'YYYY년' }"
                    @dayclick="onDayClick"
                />
            </div>
        </transition>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Ref, Vue, Watch } from 'vue-property-decorator'
import dayjs from 'dayjs'

// const month = new Date().getMonth()
// const year = new Date().getFullYear()

export type Period = { end: Date; start: Date }

@Component({
    components: {
        DatePicker: () => ({
            component: import('v-calendar').then(
                vCalendar => vCalendar.DatePicker,
            ),
        }),
    },
})
export default class CalendarField extends Vue {
    @Ref('input') readonly input!: HTMLInputElement

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
    @Prop([Date, Object])
    readonly defaultValue!: Date | Period

    /** 읽기전용 */
    @Prop({ type: Boolean, default: false })
    readonly readonly!: boolean

    /** 타입 : 인풋한개 (default) / 인풋두개( range ) */
    @Prop({ type: String })
    readonly type!: string

    /** 기간 범위 선택값 : range(yyyy.mm.dd ~ yyyy.mm.dd) */
    @Prop({ type: Boolean, default: false })
    readonly isRange!: boolean

    /** 선택 가능한 범위 일수 */
    @Prop({ type: Number })
    readonly rangeSection!: number

    /** 선택 가능한 최소 일 */
    @Prop({ type: Date, default: undefined })
    readonly minDate!: Date

    /** focus 상태 */
    private focusedClass = false

    /** 실제 값 */
    private value: Date | string | null | Period =
        this.defaultValue ||
        (this.isRange
            ? {
                  start: dayjs(this.defaultValue).toDate(),
                  end: dayjs(this.defaultValue)
                      .add(this.rangeSection || 1, 'day')
                      .toDate(),
              }
            : new Date())

    /** datepicker 노출 여부 */
    private datepickerVisible = false

    /** 화면에 보여질 value */
    get displayValue(): string {
        if (this.isRange) {
            const period = this.value as Period
            const start = dayjs(period.start || undefined).format('YYYY.MM.DD')
            const end = dayjs(period.end || undefined).format('YYYY.MM.DD')
            return `${start} ~ ${end}`
        } else {
            const date = this.value as Date
            return dayjs(date).format('YYYY.MM.DD')
        }
    }

    /** 기간 범위 선택 타입 */
    get range(): boolean {
        return this.isRange
    }

    /** 선택 가능한 최대 날짜 */
    get maxDate(): Date | undefined {
        if (this.isRange) {
            return this.$dayjs((this.value as Period).start)
                .add(29, 'day')
                .toDate()
        }
        return undefined
    }

    @Watch('value')
    changeValue(newValue: Date /* oldValue: Date */) {
        /**
         * 값이 변경 될때 마다 호출
         * @event change
         */
        this.$emit('change', {
            value: newValue,
            fieldName: this._.camelCase(this.id),
        })
        this.hideDatepicker()
    }

    onKeydown(event: KeyboardEvent) {
        event.preventDefault()
    }

    /**
     * 캘린더 날짜를 클릭 했을 때
     * @notice 경우에 따라 parameter가 2가지로 나뉨
     * @param { object: { start: Date, end: Date} } day 기간 범위 선택 일 경우
     * @param { object: { date: Date } } day 단일 선택인 경우
     */
    onDayClick(day: { date: Date } | Period) {
        /**
         * @event day-click
         */
        this.$emit('day-click', day)
    }

    onClickIcon() {
        this.input.focus()
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

    onBlur(/* event: FocusEvent */) {
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
