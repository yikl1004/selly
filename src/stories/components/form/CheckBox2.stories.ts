import { Meta, Story } from '@storybook/vue'
import CheckBox2 from '@components/form/CheckBox2.vue'
import getProps from '../../assets/getProps'

export default {
    title: 'Components/form/CheckBox2',
    component: CheckBox2,
    argTypes: {},
    parameters: {
        docs: {
            description: {
                component: '라디오',
            },
        },
    },
} as Meta

interface Args {}

const Template: Story<Args> = (args, { argTypes }) => {
    return {
        props: getProps(argTypes),
        template: `<CheckBox2 v-bind="$props" />`,
    }
}

export const Primary = Template.bind({})
Primary.args = {
    id: 'my-radio',
    label: '라디오',
}
