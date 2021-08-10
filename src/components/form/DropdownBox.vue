<template>
    <div class="dropdown-box field-box">
        <!-- id 필요여부에 따라 삭제 가능-->
        <LabelTitle :id="id" :hidden-label="hiddenLabel" :label="label" />
        <div class="input-area" :class="{ 'select-type': true }">
            <button type="button" class="btn-input-select" :disabled="disabled" @click="onClick">
                <span>{{ selectedDisplayName }}</span>
            </button>
            <portal to="bottomSheet">
                <BottomSheet
                    :show="bottomSheetVisible"
                    :title="label"
                    :list="selectList"
                    @close="closeBottomSheet"
                    @select-option="onSelectOption"
                />
            </portal>
        </div>
        <TextInputMessage v-if="message" :message="message" :message-type="messageType" />
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { MessageType } from '@components/common/TextInputMessage.vue'
// import { FormBus, FormUpdateEvent } from './FormProvider.vue'
import type { BottomSheetOptionItem } from '@components/common/BottomSheet.vue'

/**
 * @description "list" props의 타입(DropdownBox의 'list' Props)
 */
export type DropdownBoxList = BottomSheetOptionItem[]

@Component
export default class DropdownBox extends Vue {
    /** form에 사용될 id */
    @Prop({ type: String, required: true })
    readonly id!: string

    /** label태그에 들어갈 텍스트 */
    @Prop({ type: String, default: '', required: true })
    readonly label!: string

    /** label을 비노출여부 */
    @Prop(Boolean)
    readonly hiddenLabel!: boolean

    /** 비활성화 케이스 */
    @Prop({ type: Boolean, default: false })
    readonly disabled!: boolean

    /** 에러 메세지 */
    @Prop(String)
    readonly errorMessage!: string

    /** 성공 메세지 */
    @Prop(String)
    readonly successMessage!: string

    /** 기본 값 */
    @Prop(String)
    readonly defaultValue!: string

    /** option list를 주입해함! */
    @Prop({ type: Array, default: [], required: true })
    readonly list!: DropdownBoxList

    /**
     * @category Data(State)
     */

    /** 실제 값 */
    private value: string = this.defaultValue || ''

    /** 선택영역 노춣 여부 */
    private bottomSheetVisible = false

    /** props로 받은 리스트 */
    private selectList: DropdownBoxList = this.list || []

    /** @Watch */
    @Watch('list')
    changeList(value: DropdownBoxList /* oldValue: DropdownBoxList */) {
        if (!this._.isNull(value)) {
            this.init()
        }
    }

    /**
     * @category Computed
     */

    /** 보여지는 선택된 이름 */
    get selectedDisplayName(): string {
        const name = this.selectList.find(option => option.selected)
        return (name && name.displayName) || this.label
    }

    /** 메세지 타입 (에러, 성공) */
    get messageType(): MessageType {
        return this.successMessage ? 'success' : 'error'
    }

    /** 메세지 반환 */
    get message(): string {
        return this.errorMessage || this.successMessage
    }

    /**
     * @category Methods
     */

    openBottomSheet() {
        this.bottomSheetVisible = true
    }

    closeBottomSheet() {
        this.bottomSheetVisible = false
    }

    onSelectOption(value: string) {
        // const selectedValue = this.list.find(option => option.value === value) as BottomSheetOptionItem
        const changedList = this.list.map(option => {
            option.selected = option.value === value
            return option
        })
        this.value = value
        this.selectList = changedList

        /**
         * 선택된 값을 select 이벤트를 통해 전달
         * @event select
         */
        this.$emit('select', this.value)

        /**
         * 변경된 option list를 업데이트(sync 수식어) ****** 보류
         * @event update:list
         */
        // this.$emit('update:list', changedList)

        // FormBus.$emit(FormUpdateEvent, {
        //     value,
        //     fieldName: this._.camelCase(this.id),
        // })

        this.closeBottomSheet()
    }

    onClick() {
        this.openBottomSheet()
    }

    init() {
        if (this.defaultValue) {
            this.selectList = this.list.map(item => {
                item.selected = this.defaultValue === item.value
                return item
            })
        } else {
            this.selectList = this.list
        }
    }

    mounted() {
        this.init()
    }
}
</script>

<style scoped lang="scss" src="./DropdownBox.scss"></style>
