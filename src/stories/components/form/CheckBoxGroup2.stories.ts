import { Meta, Story } from '@storybook/vue'
import CheckBoxGroup2 from '@components/form/CheckBoxGroup2.vue'
import getProps from '../../assets/getProps'

export default {
    title: 'Components/form/CheckBoxGroup2',
    component: CheckBoxGroup2,
    argTypes: {},
    parameters: {
        docs: {
            description: {
                component: '체크박스 그룹(동의)',
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
        template: `<CheckBoxGroup2 v-bind="$props" />`,
    }
}

export const Primary = Template.bind({})
Primary.args = {
    id: 'my-radio',
    label: '개인정보처리방침 동의',
    value: '개인정보처리방침 동의',
}

export const Group = Template.bind({})
Group.args = {
    id: 'my-radio',
    label: '개인정보처리방침 동의',
    value: '개인정보처리방침 동의',
    list,
}
