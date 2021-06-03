<template>
    <div :class="['switch', type]">
        <input :id="id" v-model="switchValue" type="checkbox" :name="id" :disabled="disabled" />
        <label :for="id">
            <span class="ir">{{ label }}</span>
            <span class="status" :hidden="isLarge" />
        </label>
    </div>
</template>

<script lang="ts">
import { Component, Prop, PropSync, Vue, Watch } from 'vue-property-decorator'

/**
 * 서로 다른 옵션의 선택이 아닌 단일 옵션의 선택/미선택(On/Off)으로 사용.
 * 선택시 활성화(스위치가 우측에 가있는 상태)로 표시되며,  컬러는 로카 UI메인 컬러인 블루를 포인트 컬로로 사용
 *      - 스위치 버튼의 사이즈는 노출되는 위치 및 경/중에 따라 선택적으로 사용 가능
 */

@Component
export default class SwitchButton extends Vue {
    /**
     * @category Props
     */

    /** label 지정 */
    @Prop({ type: String, required: true })
    readonly label!: string

    /** id 지정 */
    @Prop({ type: String, required: true })
    readonly id!: string

    /** value 지정 */
    @PropSync('value', { type: Boolean, required: false })
    private switchValue!: boolean

    /** 디자인 type */
    @Prop({ type: String, default: 'large' })
    readonly type!: SwitchDesignType

    /** 활성화 여부 */
    @Prop({ type: Boolean, default: false })
    readonly disabled!: boolean

    /**
     * @category Computed
     */

    /* large 타입 인지 */
    get isLarge(): boolean {
        return this.type === 'large'
    }

    /**
     * @category Watch
     */
}
</script>

<style scoped lang="scss" src="./SwitchButton.scss"></style>
