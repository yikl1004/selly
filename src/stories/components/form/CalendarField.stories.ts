import { Meta, Story } from '@storybook/vue'
import CalendarField from '@components/form/CalendarField.vue'
import getProps from '../../assets/getProps'

export default {
    title: 'Components/form/Calendar Field',
    component: CalendarField,
    argTypes: {},
    parameters: {
        docs: {
            description: {
                component: '날짜 선택기',
            },
        },
    },
} as Meta

interface Args {}

const Template: Story<Args> = (args, { argTypes }) => {
    return {
        props: getProps(argTypes),
        template: `<CalendarField v-bind="$props" />`,
    }
}

export const Primary = Template.bind({})
Primary.args = {
    label: '날짜선택',
    name: 'date',
}
