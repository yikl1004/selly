<template>
    <div class="phone-agree-field field-box">
        <LabelTitle
            :id="id"
            label-type="label"
            :hidden-label="hiddenLabel"
            :label="label"
        />

        <div :class="['phone-auth-box', { opened: open }]">
            <div class="check-box-area">
                <CheckBox id="checkAll" label="전체 동의" />
                <button type="button" class="open" @click="toggle">
                    <span class="ir">{{ open ? '열림' : '닫힘' }}</span>
                </button>
            </div>
            <div class="check-list">
                <div class="check-list-wrapper">
                    <div class="list-item">
                        <CheckBox
                            id="check01"
                            label="개인정보 수집 및 이용동의"
                        />
                        <BasicButton type="textGray"> 보기 </BasicButton>
                    </div>
                    <div class="list-item">
                        <CheckBox id="check02" label="고유식별정보 처리 동의" />
                        <BasicButton type="textGray"> 보기 </BasicButton>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class AgreePhone extends Vue {
    /**
     * @category PROPS
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
    /** 토글 상태 */
    private open = true

    toggle() {
        this.open = !this.open
    }
}
</script>

<style lang="scss" scoped src="./AgreePhone.scss"></style>
