import { ArgTypes, Meta, Story } from '@storybook/vue'
import BasicButton from '@components/common/BasicButton.vue'

export default {
    title: 'Components/Button',
    component: BasicButton,
    argTypes: {
        onClick: {
            category: 'events',
            action: 'onClick',
        },
        size: {
            options: ['none', 'large', 'medium', 'small'],
            control: {
                type: 'select',
            },
        },
        type: {
            options: [
                'basic',
                'textBlue',
                'textGray',
                'with',
                'dialogBlue',
                'dialogWhite',
            ],
            control: {
                type: 'select',
            },
        },
    },
    parameters: {
        docs: {
            description: {
                component:
                    '사용자 행동을 유도하는 용도로 쓰이는 라운드 형태를 접목한 사각형 형태의 버튼.<br/>버튼의 사용처에 따라 크기(Large/Medium/Small과 Tiny)로 사용<br/>너비는 배치 상황과 환경에 따라 가변적으로 사용.<br/>의미와 우선 순위에 따라 색상(Primary Color의 변형 / Gray)으로 구분',
            },
        },
    },
} as Meta

interface Args {
    class: string
    size: string
    type: string
}

const Template: Story<Args> = (args, { argTypes }) => {
    const makeProps = (argTypes: ArgTypes) =>
        Object.keys(argTypes).filter(type =>
            ['class', 'default'].every(exception => exception !== type),
        )

    return {
        props: makeProps(argTypes),
        template: `
            <BasicButton v-bind="$props">확인</BasicButton>
        `,
    }
}

export const Large = Template.bind({})
Large.args = {
    size: 'large',
}

export const Medium = Template.bind({})
Medium.args = {
    size: 'medium',
}
Medium.parameters = {
    docs: {
        description: {
            story: 'some story **markdown**',
        },
    },
}

export const Small = Template.bind({})
Small.args = {
    size: 'small',
}

export const textBlue = Template.bind({})
textBlue.args = {
    type: 'textBlue',
}

export const textGray = Template.bind({})
textGray.args = {
    type: 'textGray',
}

export const dialogBlue = Template.bind({})
dialogBlue.args = {
    type: 'dialogBlue',
}
export const dialogWhite = Template.bind({})
dialogWhite.args = {
    type: 'dialogWhite',
}
