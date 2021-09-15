<template>
    <portal to="modal">
        <transition
            mode="out-in"
            enter-active-class="animate__animated animate__fadeIn"
            leave-active-class="animate__animated animate__fadeOut"
        >
            <div
                v-if="showState"
                ref="modal"
                :class="['modal', type]"
                @click="outsideClick"
            >
                <div ref="inner" class="inner">
                    <!-- <header class="modal-header">
                        <h2 v-if="title" class="title">
                            {{ title }}
                        </h2>
                    </header> -->
                    <div class="contents">
                        <div class="description">
                            <slot />
                        </div>
                    </div>
                    <div class="button-group">
                        <BasicButton
                            v-if="buttonText.cancel"
                            type="dialogWhite"
                            @click="onCancel"
                        >
                            {{ buttonText.cancel }}
                        </BasicButton>
                        <BasicButton type="dialogBlue" @click="onConfirm">
                            {{ buttonText.confirm }}
                        </BasicButton>
                    </div>
                </div>
            </div>
        </transition>
        <Dimmed :show="showState" />
    </portal>
</template>

<script lang="ts">
import { Component, Prop, PropSync, Ref, Vue } from 'vue-property-decorator'

interface ButtonText extends Object {
    cancel?: string
    confirm: string
}

/**
 * @description Modal 컴포넌트의 디자인타입을 결정하는 Props
 */
export type ModalDesignType = 'dialog' | 'popup'

@Component
export default class Modal extends Vue {
    /** @Refs */
    @Ref() readonly inner!: HTMLDivElement
    @Ref() readonly modal!: HTMLDivElement

    /**
     * @category Props
     */

    /** 노출 여부(초기 설정) */
    @PropSync('show', { type: Boolean, default: false, required: true })
    public showState!: boolean

    /** 제목 */
    @Prop({ type: String })
    readonly title!: string

    /** 버튼 텍스트 */
    @Prop({
        type: Object,
        default: () => ({ cancel: '취소', confirm: '확인' }),
    })
    readonly buttonText!: ButtonText

    /** 디자인 타입 */
    @Prop({ type: String, default: 'dialog' })
    readonly type!: ModalDesignType

    // @Prop({ type: String })
    // readonly description!: string

    /**
     * @category Watch
     */

    /**
     * @category Data
     */

    /** 노출 여부(컴포넌트 내부) */
    // private showState: boolean = this.show || false

    /**
     * @category Computed
     */

    /**
     * @category Methods
     */

    onCancel(/* a?: any */) {
        /**
         * 확인 버튼 클릭
         * @event cancel
         */
        this.$emit('cancel')
        this.showState = false
    }

    outsideClick(event: MouseEvent | TouchEvent) {
        const target = event.target as HTMLDivElement
        target.classList.contains('modal') && this.onCancel()
    }

    onConfirm() {
        /**
         * 확인 버튼 클릭
         * @event confirm
         */
        this.$emit('confirm')
        this.showState = false
    }
}
</script>

<style scoped lang="scss" src="./Modal.scss"></style>
