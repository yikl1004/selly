<template>
    <span>{{ timeString }}</span>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

@Component
export default class Timer extends Vue {
    /** count 할 숫자 */
    @Prop({ type: Number, required: true })
    readonly count!: number

    /** count 할 숫자의 시간 단위 */
    @Prop({ type: String, required: true })
    readonly unit!: 'minute' | 'second'

    /** 반복 주기(초, second) */
    @Prop({ type: Number, default: 1000 })
    readonly interval!: number

    /** 날짜/시간 형식 format */
    @Prop({ type: String, default: 'm:ss' })
    readonly format!: string

    /**
     * @category Watch
     */
    @Watch('count')
    changeCount(/* value: number, oldValue: number */) {
        this.start()
    }

    /**
     * @category Data(State)
     */
    private timeString = ''
    private timer?: number

    start() {
        this.clearTimeout()

        const getCurrentTimeUnix = this.$dayjs().unix()
        const targetTimeUnix = this.$dayjs().add(this.count, this.unit).unix()
        const timeout = 1000
        let duration = this.$dayjs.duration(
            targetTimeUnix - getCurrentTimeUnix,
            'seconds',
        )
        this.timer = window.setInterval(() => {
            if (
                duration.asSeconds() <= 1 ||
                getCurrentTimeUnix >= targetTimeUnix
            ) {
                this.timeString = '00:00'
                clearInterval(this.interval)
            } else {
                duration = this.$dayjs.duration(
                    duration.asSeconds() - 1,
                    'seconds',
                )
                this.timeString = duration.format(this.format)
            }
        }, timeout)
    }

    clearTimeout() {
        window.clearInterval(this.timer)
    }

    mounted() {
        this.start()
    }

    destroyed() {
        this.clearTimeout()
    }
}
</script>

<style scoped></style>
