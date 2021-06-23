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
import Radio from '@components/form/Radio.vue'

// common
import Link from '@components/common/Link.vue'
import Header from '@components/common/Header.vue'
import FixedBtnBox from '@components/common/FixedBtnBox.vue'
import BottomSheet from '@components/common/BottomSheet.vue'
import Timer from '@components/common/Timer.vue'
import LoginButton from '@components/common/LoginButton.vue'
import Tab from '@components/common/Tab.vue'
import Dimmed from '@components/common/Dimmed.vue'
import Modal from '@components/common/Modal.vue'
import AccoItem from '@components/common/AccoItem.vue'
import ProgressBar from '@components/common/ProgressBar.vue'
import Title from '@components/common/Title.vue'
import InfoList from '@components/common/InfoList.vue'
import TextInputMessage from '@components/common/TextInputMessage.vue'
import Textarea from '@components/form/Textarea.vue'
import FullPopup from '@components/common/FullPopup.vue'
import CautionBox from '@components/common/CautionBox.vue'
import BulletList from '@components/common/BulletList.vue'
import Gnb from '@components/common/Gnb.vue'

//개발씽크맞추기 전
import DropdownBox2 from '@components/form/DropdownBox2.vue'
import CheckBoxGroup2 from '@components/form/CheckBoxGroup2.vue'
import CheckBox2 from '@components/form/CheckBox2.vue'

const componentList: { [key: string]: VueConstructor }[] = [
    { Link },
    { FileUploader },
    { Header },
    { FixedBtnBox },
    { TextField },
    { Radio },
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
    { AccoItem },
    { ProgressBar },
    { Title },
    { InfoList },
    { TextInputMessage },
    { Textarea },
    { FullPopup },
    { CautionBox },
    { BulletList },
    { Gnb },

    //개발씽크 맞추기 전
    { DropdownBox2 },
    { CheckBoxGroup2 },
    { CheckBox2 },
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
