<template>
    <div
        v-click-outside="onBlur"
        class="calendar-field field-box"
        :class="type"
    >
        <LabelTitle :hidden-label="hiddenLabel" :label="label" />
        <div class="flex">
            <div class="input-area" :class="{ focus: focusedClass }">
                <input
                    ref="input"
                    type="text"
                    :value="displayValue"
                    :class="{ readonly }"
                    @keydown="onKeydown"
                    @focus="onFocus"
                />
                <i class="icon-calendar" />
            </div>
            <template v-if="type">
                <span class="icon">~</span>

                <div class="input-area" :class="{ focus: focusedClass }">
                    <input
                        ref="input"
                        type="text"
                        :value="displayValue"
                        :class="{ readonly }"
                        @keydown="onKeydown"
                        @focus="onFocus"
                    />
                    <i class="icon-calendar" />
                </div>
            </template>
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
                    is-range
                    :attributes="attrs"
                    :masks="{ title: 'MM월 YYYY', navYears: 'YYYY년' }"
                    @dayclick="onDayClick"
                ></date-picker>
            </div>
        </transition>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Ref, Vue, Watch } from 'vue-property-decorator'
import dayjs from 'dayjs'

// const month = new Date().getMonth()
// const year = new Date().getFullYear()

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
    /**
     * @Refs
     */

    @Ref('input') readonly input!: HTMLInputElement

    /**
     * @Props
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

    /** 타입 : 인풋한개 (default) / 인풋두개( range ) */
    @Prop({ type: String })
    readonly type!: string

    /**
     * @Data (State)
     */

    /** focus 상태 */
    private focusedClass = false

    /** 실제 값 */
    private value: Date | null = this.defaultValue || new Date()

    /** datepicker 노출 여부 */
    private datepickerVisible = false

    /**  달력 선택된 값 표시 */
    private attrs: Array<object> = [
        {
            highlight: {
                start: { fillMode: 'light' },
                base: { fillMode: 'light' },
                end: { fillMode: 'light' },
            },
            // dates: { start: new Date(2019, 0, 14), end: new Date(2019, 0, 18) },
        },
    ]

    private selectAttr: object = {
        highlight: {
            backgroundColor: 'white',
            borderColor: 'red',
            borderWidth: '3px',
            borderStyle: 'solid',
            width: '2.4rem',
            height: '2.4rem',
        },
        contentStyle: {
            color: 'grey',
        },
    }

    /**
     * @Computed
     */

    /** 화면에 보여질 value */
    get displayValue(): string {
        return dayjs(this.value || undefined).format('YYYY.MM.DD')
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
    }

    /**
     * @Methods
     */

    onKeydown(event: KeyboardEvent) {
        event.preventDefault()
    }

    onDayClick(/* day: { date: Date } */) {
        // this.hideDatepicker()
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
