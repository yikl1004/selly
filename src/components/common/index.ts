import Vue, { AsyncComponent, VueConstructor } from 'vue'

// form
import FileUploader from '@components/form/FileUploader.vue'
import TextField from '@components/form/TextField.vue'
import BasicButton from '@components/common/BasicButton.vue'
import BtnGroup from '@components/common/BtnGroup.vue'
import SecretNumber from '@components/form/SecretNumber.vue'
import ButtonField from '@components/form/ButtonField.vue'
// import CreditCardField from '@components/form/CreditCardField.vue'
import SingleSelection from '@components/form/SingleSelection.vue'
import CheckBox from '@components/form/CheckBox.vue'
import CheckBoxBlock from '@components/form/CheckBoxBlock.vue'
import CheckBoxGroup from '@components/form/CheckBoxGroup.vue'
import SwitchButton from '@components/form/SwitchButton.vue'
import DropdownBox from '@components/form/DropdownBox.vue'
import FormProvider from '@components/form/FormProvider.vue'
import Radio from '@components/form/Radio.vue'
import RadioGroup from '@components/form/RadioGroup.vue'
import EmailForm from '@components/form/EmailForm.vue'
import PhoneCertForm from '@components/form/PhoneCertForm.vue'
import AddressField from '@components/form/AddressField.vue'

// common
import Loading from '@components/common/Loading.vue'
import Anchor from '@components/common/Anchor.vue'
import Header from '@components/common/Header.vue'
import Footer from '@components/common/Footer.vue'
import FixedBtnBox from '@components/common/FixedBtnBox.vue'
import BottomSheet from '@components/common/BottomSheet.vue'
import Timer from '@components/common/Timer.vue'
import Tab from '@components/common/Tab.vue'
import Dimmed from '@components/common/Dimmed.vue'
import Modal from '@components/common/Modal.vue'
import AccoItem from '@components/common/AccoItem.vue'
import AccoItemSingle from '@components/common/AccoItemSingle.vue'
import ProgressBar from '@components/common/ProgressBar.vue'
import Title from '@components/common/Title.vue'
import InfoList from '@components/common/InfoList.vue'
import TextInputMessage from '@components/common/TextInputMessage.vue'
import Textarea from '@components/form/Textarea.vue'
import FullPopup from '@components/common/FullPopup.vue'
import CautionBox from '@components/common/CautionBox.vue'
import BulletList from '@components/common/BulletList.vue'
import Gnb from '@components/common/Gnb.vue'
import LabelTitle from '@components/common/LabelTitle.vue'
import FormTextBox from '@components/common/FormTextBox.vue'
import Flag from '@components/common/Flag.vue'
import AddressItem from '@components/common/AddressItem.vue'
import BoardItem from '@components/common/BoardItem.vue'
import BoardDetail from '@components/common/BoardDetail.vue'

//common popup
import PopupAddressFind from '@components/common/PopupAddressFind.vue'

const CalendarField = () => ({
    component: import('@components/form/CalendarField.vue'),
})

//개발씽크맞추기 전

const componentList: { [key: string]: VueConstructor | AsyncComponent }[] = [
    { Loading },
    { Anchor },
    { FileUploader },
    { Header },
    { Footer },
    { FixedBtnBox },
    { TextField },
    { Radio },
    { RadioGroup },
    { EmailForm },
    { PhoneCertForm },
    { BasicButton },
    { BtnGroup },
    { SecretNumber },
    { ButtonField },
    { BottomSheet },
    { Timer },
    { DropdownBox },
    { CalendarField },
    { Tab },
    { SingleSelection },
    { CheckBox },
    { CheckBoxBlock },
    { CheckBoxGroup },
    { SwitchButton },
    { AddressField },
    // { CreditCardField },
    { FormProvider },
    { Dimmed },
    { Modal },
    { AccoItem },
    { AccoItemSingle },
    { ProgressBar },
    { Title },
    { InfoList },
    { TextInputMessage },
    { Textarea },
    { FullPopup },
    { CautionBox },
    { BulletList },
    { Gnb },
    { LabelTitle },
    { FormTextBox },
    { Flag },
    { AddressItem },
    { BoardItem },
    { BoardDetail },

    //popup common
    { PopupAddressFind },

    //개발씽크 맞추기 전 (씽크 다 맞춤, 또 생기면 추가)
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
