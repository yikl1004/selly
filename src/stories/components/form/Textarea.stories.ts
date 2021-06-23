import { Meta, Story } from '@storybook/vue'
import Textarea from '@components/form/Textarea.vue'
import _ from 'lodash'
import getProps from '../../assets/getProps'

export default {
    title: 'Components/form/Textarea',
    component: Textarea,
    argTypes: {},
} as Meta

interface Args {}

const Template: Story<Args> = (args, { argTypes }) => {
    return {
        props: getProps(argTypes),
        template: `<Textarea v-bind="$props" />`,
    }
}

export const Primary = Template.bind({})
Primary.args = {
    id: 'my-text',
    label: '소득구분',
    placeholder: '소득구분 입력',
}
