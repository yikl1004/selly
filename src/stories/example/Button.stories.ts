import { Meta, Story } from '@storybook/vue'
import MyButton from './Button.vue'

export default {
    title: 'Example/Button',
    component: MyButton,
    argTypes: {
        backgroundColor: { control: 'color' },
        size: {
            control: { type: 'select' },
            options: ['small', 'medium', 'large'],
        },
    },
} as Meta<ArgTypes>

interface Args {
    label: string
    primary?: boolean
    size?: 'small' | 'medium' | 'large'
}

interface ArgTypes {
    backgroundColor: {
        control: 'color'
    }
    size: {
        control: {
            type: 'select'
            options: ['small', 'medium', 'large']
        }
    }
}

const Template: Story<Args> = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { MyButton },
    template: '<my-button @onClick="onClick" v-bind="$props" />',
})

export const Primary = Template.bind({})
Primary.args = {
    primary: true,
    label: 'Button',
}

export const Secondary = Template.bind({})
Secondary.args = {
    label: 'Button',
}

export const Large = Template.bind({})
Large.args = {
    size: 'large',
    label: 'Button',
}

export const Small = Template.bind({})
Small.args = {
    size: 'small',
    label: 'Button',
}
