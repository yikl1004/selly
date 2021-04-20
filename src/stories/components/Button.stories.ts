import { Description } from '@storybook/addon-docs/blocks'
import { Meta, Story } from '@storybook/vue'
import BasicButton from '@components/common/BasicButton.vue'

export default {
    title: 'Components/Button',
    component: BasicButton,
    argTypes: {
        onClick: {
            category: 'events',
            action: 'onClick',
        },
        size: {
            options: ['large', 'medium', 'small'],
            control: {
                type: 'select',
            },
        },
    },
    docs: {
        description: {
            story: 'some story **markdown**',
        },
    },
} as Meta

interface Args {}

const Template: Story<Args> = (args, { argTypes }) => {
    console.log('@@@@@@', argTypes, args)
    return {
        props: Object.keys(argTypes),
        template: `
            <BasicButton v-bind="$props">확인</BasicButton>
        `,
    }
}

export const Large = Template.bind({})
Large.args = {
    size: 'large',
}

export const Medium = Template.bind({})
Medium.args = {
    size: 'medium',
}

export const Small = Template.bind({})
Small.args = {
    size: 'small',
}

export const LineLarge = Template.bind({})
LineLarge.args = {
    size: 'large',
}

export const LineMedium = Template.bind({})
LineMedium.args = {
    size: 'medium',
}

export const LineSmall = Template.bind({})
LineSmall.args = {
    size: 'small',
}
