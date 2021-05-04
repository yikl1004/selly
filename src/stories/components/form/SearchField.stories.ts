import { Meta, Story } from '@storybook/vue'
import SearchField from '@components/form/SearchField.vue'
import getProps from '../../assets/getProps'

export default {
    title: 'Components/form/Search Field',
    component: SearchField,
    argTypes: {},
    parameters: {
        docs: {
            description: {
                component: '검색이 필요한 입력창',
            },
        },
    },
} as Meta

interface Args {}

const Template: Story<Args> = (args, { argTypes }) => {
    return {
        props: getProps(argTypes),
        template: `<SearchField v-bind="$props" />`,
    }
}

export const Primary = Template.bind({})
Primary.args = {
    label: '검색영역',
    name: 'search',
}
