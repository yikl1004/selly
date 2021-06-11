import { Meta, Story } from '@storybook/vue'
import Modal from '@components/common/Modal.vue'
import getProps from '../assets/getProps'

export default {
    title: 'Components/common/Modal',
    component: Modal,
    components: {},
    argTypes: {},
    parameters: {
        docs: {
            description: {
                component: '',
            },
        },
    },
} as Meta

interface Args {
    show: boolean
    title?: string
    buttonText?: {
        cancel?: string
        confirm: '확인'
    }
    type?: 'dialog' | 'popup'
}

const Template: Story<Args> = (args, { argTypes }) => {
    return {
        data() {
            return {
                show: false,
            }
        },
        props: getProps(argTypes),
        template: `
        <div>
            <BasicButton size="large" @click="openModal">모달 확인</BasicButton>
            <Modal
                :show.sync="show"
                title="이거슨 제목인가?"
                :button-text="{ confirm: '확인', cancel: '취소' }"
                type="popup"
                @confirm="onConfirm"
                @cancel="onCancel"
            >
                <!-- 줄바꿈은 br 태그를 직접 넣는 걸로.... -->
                모든 국민은 법 앞에 평등하다. 누구든지 성별·종교 또는 사회적 신분에 의하여 정치적·경제적·사회적·문화적 생활의 모든 영역에 있어서
                차별을 받지 아니한다.
            </Modal>
        </div>
        `,
        methods: {
            openModal() {
                // @ts-ignore
                this.show = true
            },
            onConfirm() {
                // @ts-ignore
                this.show = false
            },
            onCancel() {
                console.log('after close modal')
            },
        },
    }
}

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {
    docs: {
        source: {
            code: `
<template>
    <div>
        <BasicButton size="large" @click="openModal">모달 확인</BasicButton>
        <Modal :show.sync="show" title="이거슨 제목인가?" :button-text="{ confirm: '확인', cancel: '취소' }" type="popup" @confirm="onConfirm" @cancel="onCancel">
            <!-- 줄바꿈은 br 태그를 직접 넣는 걸로.... -->
            모든 국민은 법 앞에 평등하다. 누구든지 성별·종교 또는 사회적 신분에 의하여 정치적·경제적·사회적·문화적 생활의 모든 영역에 있어서
            차별을 받지 아니한다.
        </Modal>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class Sample extends Vue {
    private show: boolean = false

    openModal() {
        this.show = true
    }
    
    onConfirm() {
        this.show = false
    }

    onCancel() {
        console.log('after close modal')
    }
}
</script>
            `,
        },
    },
}
Primary.decorators = [() => ({ template: '<div><story/><PortalTarget name="modal" /></div>' })]
