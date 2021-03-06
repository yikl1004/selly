import Vue, { AsyncComponent, VueConstructor } from 'vue'

// form
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
import LabelTitle from '@components/common/LabelTitle.vue'
import FormTextBox from '@components/common/FormTextBox.vue'
import Flag from '@components/common/Flag.vue'
import AddressItem from '@components/common/AddressItem.vue'
import BoardItem from '@components/common/BoardItem.vue'
import BoardDetail from '@components/common/BoardDetail.vue'
import BannerSwiper from '@components/common/BannerSwiper.vue'
import BannerAffiliate from '@components/common/BannerAffiliate.vue'
import Step from '@components/common/Step.vue'
import RecommenderBox from '@components/common/RecommenderBox.vue'

//common popup
import PopupAddressFind from '@components/common/PopupAddressFind.vue'
import PopupTerms from '@components/common/PopupTerms.vue'

// layouts
import Page from '@layout/Page.vue'
import PageBody from '@layout/PageBody.vue'
import Header from '@layout/Header.vue'
import Footer from '@components/common/Footer.vue'

const CalendarField = () => ({
    component: import('@components/form/CalendarField.vue'),
})

//????????????????????? ???

const componentList: { [key: string]: VueConstructor | AsyncComponent }[] = [
    { Loading },
    { Anchor },
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
    { LabelTitle },
    { FormTextBox },
    { Flag },
    { AddressItem },
    { BoardItem },
    { BoardDetail },
    { BannerSwiper },
    { BannerAffiliate },
    { Step },
    { RecommenderBox },

    //popup common
    { PopupAddressFind },
    { PopupTerms },

    // layouts
    { Page },
    { PageBody },
    { Header },
    { Footer },

    //???????????? ????????? ??? (?????? ??? ??????, ??? ????????? ??????)
]

export const registerCommonComponent = (): void => {
    componentList.forEach(componentInfo => {
        // ?????? ????????? 1??? ???????????? index??? 0
        const params = Object.entries(componentInfo)[0]
        Vue.component(...params)
    })
    console.log('common components registered...')
}

export default componentList
