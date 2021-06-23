import { Meta, Story } from '@storybook/vue'
import CheckBox from '@components/form/CheckBox.vue'
import _ from 'lodash'
import getProps from '../../assets/getProps'

export default {
    title: 'Components/form/CheckBox',
    component: CheckBox,
    argTypes: {
        type: {
            options: ['normal', 'circle'],
            control: { type: 'select' },
        },
    },
} as Meta

interface Args {}

const Template: Story<Args> = (args, { argTypes }) => {
    return {
        props: getProps(argTypes),
        template: `<CheckBox v-bind="$props" />`,
    }
}

export const Normal = Template.bind({})
Normal.args = {
    type: 'normal',
    id: 'test1',
    name: 'test1',
    label: '개인정보 처리방침',
    defaultValue: false,
}

export const Circle = Template.bind({})
Circle.args = {
    type: 'circle',
    id: 'test2',
    name: 'test2',
    label: '개인정보 처리방침',
    defaultValue: false,
}
