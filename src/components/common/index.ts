import Vue, { VueConstructor } from 'vue'
import _ from 'lodash'

import Link from '@components/common/Link.vue'
import Header from '@components/common/Header.vue'
import FileUploader from '@components/form/FileUploader.vue'
import TextField from '@components/form/TextField.vue'
import BasicButton from '@components/common/BasicButton.vue'
import SecretNumber from '@components/form/SecretNumber.vue'
import ButtonField from '@components/form/ButtonField.vue'
import BottomSheet from '@components/common/BottomSheet.vue'
import Timer from '@components/common/Timer.vue'
import DropdownBox from '@components/common/DropdownBox.vue'
import LoginButton from '@components/common/LoginButton.vue'

const componentList: { [key: string]: VueConstructor }[] = [
    { Link },
    { FileUploader },
    { Header },
    { TextField },
    { BasicButton },
    { SecretNumber },
    { ButtonField },
    { BottomSheet },
    { Timer },
    { DropdownBox },
    { LoginButton },
]

export const registerCommonComponent = (): void => {
    componentList.forEach(componentInfo => {
        // 배열 원소가 1개 뿐이므로 index는 0
        const params = Object.entries(componentInfo)[0]
        Vue.component(...params)
    })
    console.log('common components registered...')
}

export default componentList
