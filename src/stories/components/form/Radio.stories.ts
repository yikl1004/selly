import { Meta, Story } from '@storybook/vue'
import Radio from '@components/form/Radio.vue'
import getProps from '../../assets/getProps'

export default {
    title: 'Components/form/Radio',
    component: Radio,
    argTypes: {},
    parameters: {
        docs: {
            description: {
                component: '라디오',
            },
        },
    },
} as Meta

interface Args {
    id: string
    label: string
}

const Template: Story<Args> = (args, { argTypes }) => {
    return {
        props: getProps(argTypes),
        template: `<Radio v-bind="$props" />`,
    }
}

export const Primary = Template.bind({})
Primary.args = {
    id: 'my-radio',
    label: '라디오',
}
