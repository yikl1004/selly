import { Meta, Story } from '@storybook/vue'
import SecretNumber from '@components/form/SecretNumber.vue'
import getProps from '../../assets/getProps'

export default {
    title: 'Components/form/Secret Number',
    component: SecretNumber,
    argTypes: {
        backLength: {
            options: [1, 7],
            control: { type: 'select' },
        },
    },
    parameters: {
        docs: {
            description: {
                component: '주민등록번호 입력시 사용, 7자리, 성별 1자리',
            },
        },
    },
} as Meta

interface Args {}

const Template: Story<Args> = (args, { argTypes }) => {
    return {
        props: getProps(argTypes),
        template: `<PersonalNumber v-bind="$props" />`,
    }
}

export const Primary = Template.bind({})
Primary.args = {
    type: '',
    id: 'personal-number',
    label: '주민등록번호',
}

export const OneDigit = Template.bind({})
OneDigit.args = {
    type: '',
    id: 'personal-number',
    label: '주민등록번호',
}

export const FullDigit = Template.bind({})
FullDigit.args = {
    type: '',
    id: 'personal-number-1',
    label: '주민등록번호',
    backLength: 1,
}
