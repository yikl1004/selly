import { Meta, Story } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import CheckBoxGroup from '@components/form/CheckBoxGroup.vue'
import getProps from '../../assets/getProps'

export default {
    title: 'Components/form/CheckBoxGroup',
    component: CheckBoxGroup,
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

const Template: Story<Args> = (args, { argTypes }) => {
    return {
        data() {
            return {
                list: [
                    { value: 'policy', label: '개인정보처리방침 동의', checked: true },
                    { value: 'uniq', label: '고유식별정보 처리동의' },
                    { value: 'telecom', label: '통신사 이용약관 동의' },
                    { value: 'cert', label: '본인확인 서비스 약관 동의' },
                ],
            }
        },
        // argTypes에서 'list' 는 제외하고 props를 가져 온다.
        props: getProps(argTypes, ['list']),
        template: `<CheckBoxGroup v-bind="$props" :list="list" @change="change" />`,
        methods: {
            change(list: any[]) {
                // @ts-ignore
                this.list = list
                const onChangeAction = action('change')
                // @ts-ignore
                onChangeAction(this.list)
            },
        },
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
}
