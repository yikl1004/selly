<template>
    <div class="check-box-group">
        <h3 class="title">
            {{ title }}
        </h3>
        <div class="input-area" :class="{ focus: focusedClass }">
            <input :id="`${id}-all`" v-model="value" type="checkbox" :disabled="disabled" :name="name" @focus="onFocus" @blur="onBlur" />
            <label class="display-name" :for="`${id}-all`">
                전체동의
            </label>
            <button type="button" :class="['open', { opened: open }]" @click="toggle">
                <span class="ir">{{ open ? '열림' : '닫힘' }}</span>
            </button>
        </div>
        <div :class="['check-list', { opened: open }]">
            <slot />
        </div>
    </div>
</template>

<script lang="ts">
import { VNode, VNodeComponentOptions } from 'vue'
import { Component, Prop, PropSync, ProvideReactive, Vue } from 'vue-property-decorator'

@Component
export default class CheckBoxGroup extends Vue {
    /**
     * @category Prop
     */

    /** 제목 */
    @Prop({ type: String })
    readonly title!: string

    /** form name */
    @Prop({ type: String, required: true })
    readonly name!: string

    /** id attribute */
    @Prop({ type: String, required: true })
    readonly id!: string

    /** 비활성화 사용 여부 */
    @Prop({ type: Boolean, default: false })
    readonly disabled!: boolean

    /**
     * @category ETC
     */
    @ProvideReactive('checkList')
    checkList: { [key: string]: boolean } = {}

    /**
     * @category Data(State)
     */

    /** 포커스 상태 관리 */
    private focusedClass: boolean = false

    /** 토글 상태 */
    private open: boolean = false

    /**
     * @category Computed
     */
    get value(): boolean {
        return Object.values(this.checkList).every(check => check)
    }
    set value(changeValue: boolean) {
        const checkList: { [key: string]: boolean } = {}
        for (const check in this.checkList) {
            checkList[check] = changeValue
        }

        this.checkList = checkList
    }

    /**
     * @category Methods
     */

    onFocus() {
        this.focusedClass = true
    }

    onBlur() {
        this.focusedClass = false
    }

    toggle() {
        this.open = !this.open
    }

    initialize() {
        const slots = this.$slots.default as VNode[]
        const checkList: { [key: string]: boolean } = {}
        slots.forEach(slot => {
            const componentOptions = slot.componentOptions as VNodeComponentOptions
            if (componentOptions) {
                const propsData = componentOptions.propsData
                const { name, defaultValue } = propsData as any
                checkList[name] = defaultValue
            }
        })
        this.checkList = checkList
    }

    mounted() {
        this.initialize()
    }
}
</script>

<style scoped lang="scss" src="./CheckBoxGroup.scss"></style>
