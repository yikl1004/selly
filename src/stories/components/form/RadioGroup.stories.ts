import { Meta, Story } from '@storybook/vue'
import RadioGroup from '@components/form/RadioGroup.vue'
import getProps from '../../assets/getProps'

export default {
    title: 'Components/form/RadioGroup',
    component: RadioGroup,
    argTypes: {},
    parameters: {
        docs: {
            description: {
                component: '라디오 그룹',
            },
        },
    },
} as Meta

interface Args {}

const list = [
    { value: 'policy', label: '개인정보처리방침 동의', checked: true },
    { value: 'uniq', label: '고유식별정보 처리동의' },
    { value: 'telecom', label: '통신사 이용약관 동의' },
    { value: 'cert', label: '본인확인 서비스 약관 동의' },
]

const Template: Story<Args> = (args, { argTypes }) => {
    return {
        props: getProps(argTypes),
        template: `<RadioGroup v-bind="$props" />`,
    }
}

export const Primary = Template.bind({})
Primary.args = {
    id: 'my-radio',
    label: '라디오 그룹',
    list,
}
