import type { Meta, Story } from '@storybook/vue'
import AccoItem from '@components/common/AccoItem.vue'
// import getProps from '../assets/getProps'

export default {
    title: 'Components/AccoItem',
    component: AccoItem,
    argTypes: {},
    parameters: {
        docs: {
            description: {
                component: '아코디언 리스트',
            },
        },
    },
} as Meta

interface Args {
    list: {
        title: string
        desc: string
    }[]
}

const Template: Story<Args> = (args, { argTypes }) => {
    return {
        props: Object.keys(argTypes),
        components: { AccoItem },
        template: `<AccoItem v-bind="$props" />`,
    }
}

export const Primary = Template.bind({})
Primary.args = {
    list: [
        { title: '아코디언 제목1', desc: '아코디언 내용1' },
        { title: '아코디언 제목2', desc: '아코디언 내용2' },
        { title: '아코디언 제목3', desc: '아코디언 내용3' },
    ],
}
