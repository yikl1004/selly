import { Meta, Story } from '@storybook/vue'
import Vuex from 'vuex'
import CheckBoxGroup from '@components/form/CheckBoxGroup.vue'
import _ from 'lodash'
import getProps from '../../assets/getProps'

export default {
    title: 'Components/form/CheckBoxGroup',
    component: CheckBoxGroup,
    argTypes: {
        // type: {
        //     options: ['normal', 'circle'],
        //     control: { type: 'select' },
        // },
    },
    excludeStories: /.*State$/,
} as Meta

interface Args {
    list: any
    id: string
    name: string
    title: string
    listType: 'normal' | 'circle'
}

const Template: Story<Args> = (args, { argTypes }) => {
    return {
        // data() {
        //     return {
        //         list: [
        //             { value: 'policy', label: '개인정보처리방침 동의', checked: true },
        //             { value: 'uniq', label: '고유식별정보 처리동의' },
        //             { value: 'telecom', label: '통신사 이용약관 동의' },
        //             { value: 'cert', label: '본인확인 서비스 약관 동의' },
        //         ],
        //     }
        // },
        props: getProps(argTypes),
        template: `<CheckBoxGroup :list="list" @change="change" />`,
        methods: {
            change(list: any[]) {
                // @ts-ignore
                this.list = list
            },
        },
    }
}

export const Primary = Template.bind({})
Primary.args = {
    id: 'policy',
    name: 'policy',
    title: '이용약관동의',
    listType: 'circle',
}
