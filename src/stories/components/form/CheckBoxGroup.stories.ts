import { Meta, Story } from '@storybook/vue'
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
} as Meta

interface Args {}

const Template: Story<Args> = (args, { argTypes }) => {
    return {
        props: getProps(argTypes),
        template: `
            <CheckBoxGroup v-bind="$props">
                <CheckBox
                    id="test-check-box1"
                    label="개인정보처리방침"
                    name="test-check-box1"
                    :default-value="false"
                />
                <CheckBox
                    id="test-check-box2"
                    label="개인정보처리방침"
                    name="test-check-box2"
                    :default-value="false"
                />
                <CheckBox
                    id="test-check-box3"
                    label="개인정보처리방침"
                    name="test-check-box3"
                    :default-value="false"
                />
                <CheckBox
                    id="test-check-box4"
                    label="개인정보처리방침"
                    name="test-check-box4"
                    :default-value="false"
                />
            </CheckBoxGroup>
        `,
    }
}

export const Primary = Template.bind({})
Primary.args = {
    id: 'policy',
    name: 'policy',
    title: '이용약관동의',
}
