<template>
    <div :class="['switch', type]">
        <label>
            <input v-model="value" type="checkbox" :disabled="disabled" />
            <i>
                <span class="ir">{{ label }}</span>
            </i>
        </label>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

/**
 * @description 디자인타입을 결정합니다.
 */
export type SwitchDesignType = 'large' | 'small'

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

    /** value 지정 */
    @Prop(Boolean)
    readonly defaultValue!: boolean

    /** 디자인 type */
    @Prop({ type: String, default: 'large' })
    readonly type!: SwitchDesignType

    /** 활성화 여부 */
    @Prop({ type: Boolean, default: false })
    readonly disabled!: boolean

    /**
     * @category Data
     */

    /** on/off value */
    private value: boolean = this.defaultValue || false

    /**
     * @category Computed
     */

    /**
     * @category Watch
     */

    @Watch('value')
    changeValue(value: boolean) {
        /**
         * @event change
         */
        this.$emit('change', value)
    }
}
</script>

<style scoped lang="scss" src="./SwitchButton.scss"></style>
