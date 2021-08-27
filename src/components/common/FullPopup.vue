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
                :class="['full-popup-wrap', type, { 'btn-case': buttonText }]"
            >
                <div ref="inner" class="full-popup">
                    <div class="popup-header">
                        <strong class="popup-title">{{ title }}</strong>
                    </div>
                    <div class="popup-contents">
                        <slot />
                        <div v-if="buttonText" class="popup-btn-bottom">
                            <FixedBtnBox target="modal">
                                <BasicButton
                                    v-if="buttonText.cancel"
                                    size="large"
                                    @click="onCancel"
                                >
                                    {{ buttonText.cancel }}
                                </BasicButton>
                                <BasicButton size="large" @click="onConfirm">
                                    {{ buttonText.confirm }}
                                </BasicButton>
                            </FixedBtnBox>
                        </div>
                    </div>
                    <button
                        type="button"
                        class="btn-popup-close"
                        @click="onCancel"
                    >
                        <span class="ir">닫기</span>
                    </button>
                </div>
            </div>
        </transition>
    </portal>
</template>

<script lang="ts">
import { Component, Prop, PropSync, Ref, Vue } from 'vue-property-decorator'
import type { ModalDesignType } from './Modal.vue'

interface ButtonText extends Object {
    cancel?: string
    confirm: string
}

@Component
export default class FullPopup extends Vue {
    @Ref('inner') inner!: HTMLDivElement
    @Ref('modal') modal!: HTMLDivElement

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
    @Prop({ type: Object })
    readonly buttonText!: ButtonText

    /** 디자인 타입 */
    @Prop({ type: String, default: 'dialog' })
    readonly type!: ModalDesignType

    /** @Watch */

    /** @Data */

    /** 노출 여부(컴포넌트 내부) */
    // private showState: boolean = this.show || false

    /**
     * @category Computed
     */

    /**
     * @category Methods
     */

    onCancel(/* a?: any */) {
        this.showState = false
    }

    onConfirm() {
        /**
         * 확인 버튼 클릭
         * @event confirm
         */
        this.$emit('confirm')
    }
}
</script>

<style lang="scss" src="./FullPopup.scss"></style>
