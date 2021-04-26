import Vue from 'vue'
import { ArgTypes, Meta, Story } from '@storybook/vue'
import TextField from '@components/form/TextField.vue'
import getProps from '../../assets/getProps'

export default {
    title: 'Components/form/TextFiled',
    component: TextField,
    argTypes: {
        type: {
            options: ['text', 'number'],
            control: { type: 'select' },
        },
    },
    parameters: {
        docs: {
            description: {
                component:
                    '카드 신청 / 회원가입 / 서비스 신청 등 다양한 정보의 입력에 필요한 입력폼 스타일<br/>컨텐츠 내에서 텍스트 입력 시 사용되는 모든 필드를 안내합니다',
            },
        },
    },
} as Meta

interface Args {}

const Template: Story<Args> = (args, { argTypes }) => {
    console.log(getProps(argTypes))
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
    type: 'number',
}

export const SeperateNumberType = Template.bind({})
SeperateNumberType.args = {
    id: 'my-seperate-number',
    label: '희망한도',
    unit: '만원',
    placeholder: '만원단위',
}

export const Error = Template.bind({})
Error.args = {
    id: 'error-example',
    label: '희망한도',
    placeholder: '만원단위',
    class: 'error',
}

export const Success = Template.bind({})
Success.args = {
    id: 'success-example',
    label: '희망한도',
    placeholder: '만원단위',
}