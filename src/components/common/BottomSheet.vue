<template>
    <div class="bottom-sheet">
        <Dimmed :show="show" @click="onClose" />
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
                <div class="select-options-box">
                    <ul v-if="!!list.length" class="select-options">
                        <li v-for="(item, index) in list" :key="`list-${index}`" :class="{ selected: item.selected }">
                            <button type="button" @click="onClickOption(index)">
                                {{ item.displayName }}
                            </button>
                        </li>
                    </ul>
                </div>
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
    readonly type!: BottomSheetDesignType

    /** 리스트 타입일 경우 */
    @Prop({ type: Array, default: () => ({}) })
    readonly list!: BottomSheetOptionItem[]

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
        /**
         * 닫기
         * @event close
         */
        this.$emit('close')
    }

    onClickOption(index: number) {
        /**
         * list option 선택 시 실행
         * @event select-option
         */
        this.$emit('select-option', this.list[index].value)
        this.onClose()
    }
}
</script>

<style lang="scss" scoped src="./BottomSheet.scss"></style>
