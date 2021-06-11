import Vue, { VueConstructor } from 'vue'
import _ from 'lodash'

// form
import FileUploader from '@components/form/FileUploader.vue'
import TextField from '@components/form/TextField.vue'
import BasicButton from '@components/common/BasicButton.vue'
import SecretNumber from '@components/form/SecretNumber.vue'
import ButtonField from '@components/form/ButtonField.vue'
// import CreditCardField from '@components/form/CreditCardField.vue'
import CalendarField from '@components/form/CalendarField.vue'
import SingleSelection from '@components/form/SingleSelection.vue'
import CheckBox from '@components/form/CheckBox.vue'
import CheckBoxGroup from '@components/form/CheckBoxGroup.vue'
import SwitchButton from '@components/form/SwitchButton.vue'
import DropdownBox from '@components/form/DropdownBox.vue'
import FormProvider from '@components/form/FormProvider.vue'

// common
import Link from '@components/common/Link.vue'
import Header from '@components/common/Header.vue'
import BottomSheet from '@components/common/BottomSheet.vue'
import Timer from '@components/common/Timer.vue'
import LoginButton from '@components/common/LoginButton.vue'
import Tab from '@components/common/Tab.vue'
import Dimmed from '@components/common/Dimmed.vue'
import Modal from '@components/common/Modal.vue'

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
    { CalendarField },
    { Tab },
    { SingleSelection },
    { CheckBox },
    { CheckBoxGroup },
    { SwitchButton },
    // { CreditCardField },
    { FormProvider },
    { Dimmed },
    { Modal },
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
