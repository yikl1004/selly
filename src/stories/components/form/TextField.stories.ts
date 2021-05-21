import { Meta, Story } from '@storybook/vue'
import TextField from '@components/form/TextField.vue'
import _ from 'lodash'
import getProps from '../../assets/getProps'

export default {
    title: 'Components/form/TextFiled',
    component: TextField,
    argTypes: {
        type: {
            options: ['text', 'number', 'seperateNumber', 'select'],
            control: { type: 'select' },
        },
    },
} as Meta

interface Args {}

const Template: Story<Args> = (args, { argTypes }) => {
    return {
        props: getProps(argTypes),
        template: `<TextField v-bind="$props" />`,
    }
}

export const Primary = Template.bind({})
Primary.args = {
    id: 'my-text',
    label: '소득구분',
    placeholder: '소득구분 입력',
}

export const NumberType = Template.bind({})
NumberType.args = {
    id: 'my-text-number',
    label: '소득구분',
    placeholder: '소득구분 입력',
}

export const Readonly = Template.bind({})
Readonly.args = {
    id: 'my-readonly',
    label: '소득구분',
    defaultValue: '안녕?',
    readonly: true,
}

export const SeperateNumberType = Template.bind({})
SeperateNumberType.args = {
    id: 'my-seperate-number',
    label: '희망한도',
    placeholder: '만원단위',
    type: 'seperateNumber',
}

export const ErrorStatus = Template.bind({})
ErrorStatus.args = {
    id: 'error-example',
    label: '희망한도',
    placeholder: '만원단위',
    defaultValue: '5674',
    type: 'seperateNumber',
    validate: (value: string) => _.toNumber(value) < 3500,
    successMessage: '정확히 입력하셨습니다',
    errorMessage: '한도 초과입니다.',
}

export const SuccessStatus = Template.bind({})
SuccessStatus.args = {
    id: 'success-example',
    label: '희망한도',
    placeholder: '만원단위',
    defaultValue: '3200',
    type: 'seperateNumber',
    validate: (value: string) => _.toNumber(value) < 3500,
    successMessage: '정확히 입력하셨습니다',
}

export const WithSelect = Template.bind({})
WithSelect.args = {
    type: 'select',
    id: 'phone-number',
    list: [
        { displayName: 'KT', value: 'kt', selected: true },
        { displayName: 'SKT', value: 'skt' },
        { displayName: 'LG U+', value: 'lguplus' },
        { displayName: 'KT알뜰폰', value: 'kt_sub' },
        { displayName: 'SKT알뜰폰', value: 'skt_sub' },
        { displayName: 'LGU+알뜰폰', value: 'lguplus_sub' },
    ],
    label: '통신사 선택',
    name: 'phoneNumber',
    maxlength: 13,
}
WithSelect.decorators = [() => ({ template: '<div><story/><PortalTarget name="bottomSheet" /></div>' })]
