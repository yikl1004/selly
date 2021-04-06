import { Meta, Story } from '@storybook/vue'
import FileUploader from '@components/common/FileUploader.vue'
import { initialize } from '@/utils/index'

initialize()

export default {
    title: 'Components/common/FileUploader',
    component: FileUploader,
    argTypes: {
        backgroundColor: { control: 'color' },
        size: { control: { type: 'select', options: ['small', 'medium', 'large'] } },
    },
} as Meta<ArgTypes>

interface Args {
    label: string
    primary?: boolean
    size?: 'small' | 'medium' | 'large'
}

interface ArgTypes {
    backgroundColor: {
        control: 'color'
    }
    size: {
        control: {
            type: 'select'
            options: ['small', 'medium', 'large']
        }
    }
}

const Template: Story<Args> = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { FileUploader },
    template: '<file-uploader accept="image/*" :maxWidth="300" :maxHeight="300"></file-uploader>',
})

export const Normal = Template.bind({})
Normal.args = {
    primary: true,
    label: 'Button',
}

// export const Secondary = Template.bind({})
// Secondary.args = {
//     label: 'Button'
// }

// export const Large = Template.bind({})
// Large.args = {
//     size: 'large',
//     label: 'Button'
// }

// export const Small = Template.bind({})
// Small.args = {
//     size: 'small',
//     label: 'Button'
// }
