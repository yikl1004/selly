import { Meta, Story } from '@storybook/vue'
import DropdownBox2 from '@components/form/DropdownBox2.vue'
import getProps from '../assets/getProps'

export default {
    title: 'Components/form/Dropdown Box2',
    component: DropdownBox2,
    argTypes: {},
    parameters: {
        docs: {
            description: {
                component: '&lt;select /&gt; 태그와 같은 기능',
            },
        },
    },
} as Meta

interface Args {
    id: string
    label: string
    hiddenLabel: boolean
    name: string
    defaultValue: string
    list: any[]
}

const Template: Story<Args> = (args, { argTypes }) => {
    return {
        props: getProps(argTypes),
        template: `<DropdownBox2 v-bind="$props" />`,
    }
}

export const Primary = Template.bind({})
Primary.args = {
    id: 'phoneNumber',
    label: '휴대폰번호',
    name: 'phone',
    list: [
        { displayName: 'KT', value: 'kt', selected: true },
        { displayName: 'SKT', value: 'skt' },
        { displayName: 'LG U+', value: 'lguplus' },
        { displayName: 'KT알뜰폰', value: 'kt_sub' },
        { displayName: 'SKT알뜰폰', value: 'skt_sub' },
        { displayName: 'LGU+알뜰폰', value: 'lguplus_sub' },
    ],
}
Primary.decorators = [() => ({ template: '<div><story/><PortalTarget name="bottomSheet" /></div>' })]
