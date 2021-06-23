import { Meta, Story } from '@storybook/vue'
import SingleSelection from '@components/form/SingleSelection.vue'
import getProps from '../../assets/getProps'

export default {
    title: 'Components/form/Single Selection',
    component: SingleSelection,
    argTypes: {
        align: {
            control: {
                type: 'select',
                options: ['col', 'row'],
            },
        },
        type: {
            control: {
                type: 'select',
                options: ['button', 'radio'],
            },
        },
        onChange: {
            action: 'clicked',
        },
    },
    parameters: {
        docs: {
            description: {
                component: '라디오 버튼',
            },
        },
    },
} as Meta

interface Args {}

const list = [
    { displayName: '모바일 문자', value: 'sms' },
    { displayName: '우편(카드수령지)', value: 'post' },
    { displayName: 'test1', value: 'test1' },
]

const Template: Story<Args> = (args, { argTypes }) => {
    return {
        props: getProps(argTypes),
        template: `<SingleSelection v-bind="$props" @change="onChange" />`,
    }
}

export const Primary = Template.bind({})
Primary.args = {
    id: 'test-single-selection-radio-col',
    list,
    align: 'col',
    type: 'radio',
}

export const RadioRow = Template.bind({})
RadioRow.args = {
    id: 'test-single-selection-radio-row',
    list,
    align: 'row',
    type: 'radio',
}

export const ButtonColumn = Template.bind({})
ButtonColumn.args = {
    id: 'test-single-selection-button-col',
    list,
    align: 'col',
    type: 'button',
}

export const ButtonRow = Template.bind({})
ButtonRow.args = {
    id: 'test-single-selection-button-row',
    list,
    align: 'row',
    type: 'button',
}
