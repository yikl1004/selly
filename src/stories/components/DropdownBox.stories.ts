import { Meta, Story } from '@storybook/vue'
import DropdownBox from '@components/form/DropdownBox.vue'
import getProps from '../assets/getProps'

export default {
    title: 'Components/form/Dropdown Box',
    component: DropdownBox,
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
    list: {
        displayName: string
        value: string
        selected?: true
    }[]
}

const Template: Story<Args> = (args, { argTypes }) => {
    return {
        data() {
            return {
                list: [
                    { displayName: 'KT', value: 'kt', selected: true },
                    { displayName: 'SKT', value: 'skt' },
                    { displayName: 'LG U+', value: 'lguplus' },
                    { displayName: 'KT알뜰폰', value: 'kt_sub' },
                    { displayName: 'SKT알뜰폰', value: 'skt_sub' },
                    { displayName: 'LGU+알뜰폰', value: 'lguplus_sub' },
                ],
            }
        },
        props: getProps(argTypes, ['list']),
        template: `<DropdownBox v-bind="$props" :list="list" />`,
    }
}

export const Primary = Template.bind({})
Primary.args = {
    id: 'phoneNumber',
    label: '휴대폰번호',
    name: 'phone',
}
Primary.decorators = [
    () => ({
        template: '<div><story/><PortalTarget name="bottomSheet" /></div>',
    }),
]
