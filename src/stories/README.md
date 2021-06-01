# Storybook 작성하기

## Utils

### getProps function

usage  

```ts
// example
import getProps from '../../assets/getProps'
```

origin source

```ts
import _ from 'lodash'

const eventList = ['change', 'keydown', 'focus', 'mounted', 'input']
const exceptionList = ['default']
const getProps = <ArgTypes = any>(argTypes: ArgTypes, excludes: string[] = []) => {
    // exception props
    let props = Object.keys(argTypes).filter(type => exceptionList.every(exception => exception !== type))
    // event props add prefix '@'
    props = props.map(type => {
        if (eventList.some(event => event === type)) {
            return `on${_.capitalize(type)}`
        }
        return type
    })

    if (excludes.length) {
        props = _.difference(props, excludes)
    }

    return props
}

export default getProps

```

## Actions

참고: https://storybook.js.org/docs/vue/essentials/actions

```ts
import { action } from '@storybook/addon-actions'
import { Meta, Story } from '@storybook/vue'

export default {
    ...
    argTypes: {
        onClick: {
            action: 'clicked'
        }
    }
    ...
} as Meta

// Action을 직접 사용 할 때
const Template: Story<Args> = (args, { argTypes }) => {
    return {
        ...
        methods: {
            change(list: any[]) {
                const onChangeAction = action('change')
                // @ts-ignore
                onChangeAction(this.list)
            },
        },
    }
}
```

## Code Block 직접 작성하기

```js
export const Primary = Template.bind({})
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
```