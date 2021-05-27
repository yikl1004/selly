import { Meta, Story } from '@storybook/vue'
import Tab from '@components/common/Tab.vue'
import getProps from '../assets/getProps'

export default {
    title: 'Components/Tab',
    component: Tab,
    argTypes: {},
    parameters: {
        docs: {
            description: {
                component: '탭...',
            },
        },
    },
} as Meta

interface Args {}

const Template: Story<Args> = (args, { argTypes }) => {
    return {
        props: getProps(argTypes),
        template: `
            <Tab v-bind="$props">
                <template slot-scope="{ activeIndex }">
                    <div v-if="activeIndex === 0">
                        <p>1</p>
                    </div>
                    <div v-if="activeIndex === 1">
                        <p>2</p>
                    </div>
                    <div v-if="activeIndex === 2">
                        <p>3</p>
                    </div>
                </template>
            </Tab>
        `,
        method: {
            onChange: () => {
                console.log('onChange')
            },
        },
    }
}

export const Primary = Template.bind({})
Primary.args = {
    list: [{ name: 'first' }, { name: 'second' }, { name: 'third' }],
}
Primary.parameters = {
    docs: {
        source: {
            code: `
<Tab :list="list" :active="0">
    <template slot-scope="{ activeIndex }">
        <div v-if="activeIndex === 0">
            <p>1</p>
        </div>
        <div v-if="activeIndex === 1">
            <p>2</p>
        </div>
        <div v-if="activeIndex === 2">
            <p>3</p>
        </div>
    </template>
</Tab>
            `,
        },
    },
}
