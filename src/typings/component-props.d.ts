/**
 * @path { @component/common/Modal.vue }
 * @type { ModalDesignType }
 * @description Modal 컴포넌트의 디자인타입을 결정하는 Props
 */
type ModalDesignType = 'dialog' | 'popup'

/**
 * @path { @component/form/SwitchButton.vue }
 * @type { DesignType }
 * @description 디자인타입을 결정합니다.
 */
type SwitchDesignType = 'large' | 'small'

/**
 * @path { @component/common/BasicButton.vue }
 * @type { BasicButtonDesignType }
 * @description 디자인타입을 결정합니다.
 */
type BasicButtonDesignType =
    | 'basic' // 기본
    | 'with' // 버튼과 함께 쓰이는 형태
    | 'textBlue' // 텍스트버튼_파랑
    | 'textGray' // 텍스트버튼_회색
    | 'dialogBlue' // dialog버튼_파랑
    | 'dialogWhite' // dialog버튼_흰색
    | 'more' // 더보기

/**
 * @path { @component/form/CheckBox.vue }
 * @type { CheckBoxDesignType }
 * @description 디자인타입을 결정합니다.
 */
type CheckBoxDesignType = 'normal' | 'square'

/**
 * @path { @component/form/SingleSelection.vue }
 * @type { CheckBoxDesignType }
 * @description 디자인타입을 결정합니다.
 */
type SingleSelectionDesignType = 'button' | 'radio'

/**
 * @path { @component/form/SingleSelection.vue }
 * @type { SecretNumberType }
 * @description 디자인타입을 결정합니다.
 */
interface SingleSelectionListItem {
    displayName: string
    value: string
    checked?: boolean
    disabled?: boolean
}

/**
 * @path { @component/common/BottomSheet.vue }
 * @type { BottomSheetOptionItem }
 * @description "list" props의 타입
 */
interface BottomSheetOptionItem {
    displayName: string
    value: string
    selected?: boolean
}

/**
 * @path { @component/common/BottomSheet.vue }
 * @type { BottomSheetDesignType }
 * @description BottomSheet 의 디자인 타입
 */
type BottomSheetDesignType = 'select' | 'banner' | 'description'

/**
 * @path { @component/form/DropdownBox.vue }
 * @type { DropdownBoxList }
 * @description "list" props의 타입(DropdownBox의 'list' Props)
 */
type DropdownBoxList = BottomSheetOptionItem[]
