import { Meta, Story } from '@storybook/vue'
import SwitchButton from '@components/form/SwitchButton.vue'
import _ from 'lodash'
import getProps from '../../assets/getProps'

export default {
    title: 'Components/form/SwitchButton',
    component: SwitchButton,
    argTypes: {
        type: {
            options: ['large', 'small'],
            control: { type: 'select' },
        },
        value: {
            description: 'value 지정',
            type: { name: 'string', required: true },
            table: {
                category: 'props',
                type: { summary: 'boolean' },
            },
        },
    },
    excludeStories: /.*State$/,
} as Meta

interface Args {
    label: string
    id: string
    value: boolean
    type?: 'large' | 'small'
    disabled?: boolean
}

const Template: Story<Args> = (args, { argTypes }) => {
    // argTypes에서 'value' 는 제외하고 props를 가져 온다.
    const props = getProps(argTypes, ['value'])

    return {
        data() {
            return {
                value: args.value,
            }
        },
        props,
        template: `<SwitchButton v-bind="$props" :value="value" />`,
        methods: {},
    }
}

export const Large = Template.bind({})
Large.args = {
    id: 'switch-test1',
    label: '선택하세요',
    value: false,
}
Large.parameters = {
    // docs 에 관한 설정(storybook의 docs 탭)
    docs: {
        // docs에 표시될 (지금은 Primary) 컴포넌트 소스에 관한 설정
        source: {
            // laguage 속성을 사용해 언어별 스타일 지정(vue 지원 안됨, html로 대체해서 사용)
            // language: ''html,
            // code 내용을 직접 기입할 경우 code 를 사용
            code: `
<template>
    <SwitchButton id="switch-test1" label="선택하세요" :value="switchValue1" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Main extends Vue {
    private switchValue1: boolean = true
}
</script>
`,
        },
    },
}

export const LargeDisabled = Template.bind({})
LargeDisabled.args = {
    id: 'switch-test2',
    label: '선택하세요',
    value: false,
    disabled: true,
}

export const Small = Template.bind({})
Small.args = {
    id: 'switch-test3',
    label: '선택하세요',
    value: false,
    type: 'small',
}

export const SmallDisabled = Template.bind({})
SmallDisabled.args = {
    id: 'switch-test4',
    label: '선택하세요',
    value: false,
    disabled: true,
    type: 'small',
}
