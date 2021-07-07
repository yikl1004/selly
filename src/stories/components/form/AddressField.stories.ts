import { Meta, Story } from '@storybook/vue'
import AddressField from '@components/form/AddressField.vue'
import getProps from '../../assets/getProps'

export default {
    title: 'Components/form/Address Field',
    component: AddressField,
    argTypes: {},
    parameters: {
        docs: {
            description: {
                component: '주소검색',
            },
        },
    },
} as Meta

interface Args {}

const Template: Story<Args> = (args, { argTypes }) => {
    return {
        props: getProps(argTypes),
        template: `<AddressField v-bind="$props" />`,
    }
}

export const Primary = Template.bind({})
Primary.args = {
    label: '검색영역',
    name: 'search',
    buttonText: '검색',
}
