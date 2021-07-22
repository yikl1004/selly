import { Meta, Story } from '@storybook/vue'
import ButtonField from '@components/form/ButtonField.vue'
import getProps from '../../assets/getProps'

export default {
    title: 'Components/form/Button Field',
    component: ButtonField,
    argTypes: {},
    parameters: {
        docs: {
            description: {
                component: '검색이 필요한 입력창',
            },
        },
    },
} as Meta

interface Args {
    label: string
    name: string
    buttonText: string
    cert?: true
    timer?: {
        count: 3
        unit: string
        format: string
    }
}

const Template: Story<Args> = (args, { argTypes }) => {
    return {
        props: getProps(argTypes),
        template: `<ButtonField v-bind="$props" />`,
    }
}

export const Primary = Template.bind({})
Primary.args = {
    label: '검색영역',
    name: 'search',
    buttonText: '검색',
}

export const WithCount = Template.bind({})
WithCount.args = {
    label: '인증확인',
    name: 'cert',
    buttonText: '전송',
    cert: true,
    timer: {
        count: 3,
        unit: 'minute',
        format: 'm:ss',
    },
}
