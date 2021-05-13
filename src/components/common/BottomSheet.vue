<template>
    <div class="bottom-sheet">
        <transition
            name="bottom-sheet-dimm"
            mode="out-in"
            enter-active-class="animate__animated animate__fadeIn"
            leave-active-class="animate__animated animate__fadeOut"
        >
            <div v-show="show" class="dimm" @click="onClose" />
        </transition>
        <transition
            mode="out-in"
            enter-active-class="animate__animated animate__slideInUp"
            leave-active-class="animate__animated animate__slideOutDown"
        >
            <div v-show="show" class="inner">
                <header v-if="!!title || !!subText" class="heading">
                    <h2 v-if="!!title" class="title">
                        {{ title }}
                    </h2>
                    <h3 v-if="!!subText" class="sub-text">
                        {{ subText }}
                    </h3>
                </header>
                <p v-if="!!description" class="dscription">
                    {{ description }}
                </p>
                <div class="image-area">
                    <img src="/" alt="" />
                </div>
                <ul v-if="!!list.length" class="select-options">
                    <li v-for="(item, index) in list" :key="`list-${index}`" :class="{ selected: item.selected }">
                        <button type="button" @click="onClickOption(index)">
                            {{ item.displayName }}
                        </button>
                    </li>
                </ul>
                <slot name="checkButton" />
                <button type="button" class="close" @click="onClose">
                    <span class="ir">닫기</span>
                </button>
            </div>
        </transition>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

type DesignType = 'select' | 'banner' | 'description'

export interface OptionItem {
    displayName: string
    value: string
    selected?: boolean
}

@Component
export default class BottomSheet extends Vue {
    /**
     * @category Props
     */

    /** 제목 */
    @Prop(String)
    readonly title!: string

    /** 부연설명 */
    @Prop(String)
    readonly description!: string

    /** 부연설명 */
    @Prop(String)
    readonly subText!: string

    /** 노출 여부 */
    @Prop({ type: Boolean, required: true })
    readonly show!: boolean

    /** 디자인 타입 */
    @Prop({ type: String, default: '' })
    readonly type!: DesignType

    /** 리스트 타입일 경우 */
    @Prop({ type: Array, default: () => ({}) })
    readonly list!: OptionItem[]

    /**
     * @category Data(State)
     */
    private transitionBeforeClass: string = ''

    /**
     * @category Computed
     */

    /**
     * @category Methods
     */
    onClose() {
        // TODO: 어떻게 만들지?...
        this.$emit('close')
    }

    afterEnter() {
        this.transitionBeforeClass = 'transition-before'
    }

    beforeEnter() {
        this.transitionBeforeClass = ''
    }

    onClickOption(index: number) {
        /**
         * list의 option 선택 시 트리거 되는 함수
         * @event select-option
         */
        this.$emit('select-option', this.list[index].value)
        this.onClose()
    }
}
</script>

<style lang="scss" scoped src="./BottomSheet.scss"></style>
