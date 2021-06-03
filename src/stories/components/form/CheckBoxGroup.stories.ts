import { Meta, Story } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import CheckBoxGroup from '@components/form/CheckBoxGroup.vue'
import _ from 'lodash'
import getProps from '../../assets/getProps'

export default {
    title: 'Components/form/CheckBoxGroup',
    component: CheckBoxGroup,
    argTypes: {
        listType: {
            options: ['normal', 'circle'],
            control: { type: 'select' },
        },
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
    // argTypes에서 'list' 는 제외하고 props를 가져 온다.
    const props = getProps(argTypes, ['list'])

    return {
        data() {
            return {
                list: [
                    { value: 'policy', label: '개인정보처리방침 동의', checked: true },
                    { value: 'uniq', label: '고유식별정보 처리동의' },
                    { value: 'telecom', label: '통신사 이용약관 동의' },
                    { value: 'cert', label: '본인확인 서비스 약관 동의' },
                ],
            }
        },
        props,
        template: `<CheckBoxGroup v-bind="$props" :list="list" @change="change" />`,
        methods: {
            change(list: any[]) {
                // @ts-ignore
                this.list = list
                const onChangeAction = action('change')
                // @ts-ignore
                onChangeAction(this.list)
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
Primary.parameters = {
    // docs 에 관한 설정(storybook의 docs 탭)
    docs: {
        // docs에 표시될 (지금은 Primary) 컴포넌트 소스에 관한 설정
        source: {
            // laguage 속성을 사용해 언어별 스타일 지정(vue 지원 안됨, html로 대체해서 사용)
            // language: ''html,
            // code 내용을 직접 기입할 경우 code 를 사용
            code: `
<template>
    <CheckBoxGroup
        id="policy"
        name="group"
        title="약관동의"
        :list="checkList"
        list-type="circle"
        @change="onChange"
    />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { CheckList } from '@components/form/CheckBoxGroup.vue'
@Component
export default class Main extends Vue {
    private checkList: CheckList = [
        { value: 'policy', label: '개인정보처리방침 동의', checked: true },
        { value: 'uniq', label: '고유식별정보 처리동의' },
        { value: 'telecom', label: '통신사 이용약관 동의' },
        { value: 'cert', label: '본인확인 서비스 약관 동의' },
    ]
    onChange(list: CheckList) {
        this.checkList = list
    }
}
</script>
`,
        },
    },
}
