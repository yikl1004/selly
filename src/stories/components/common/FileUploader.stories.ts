import { Meta, Story } from '@storybook/vue'
import FileUploader from '@components/form/FileUploader.vue'
import { initialize } from '@utils/index'

initialize()

export default {
    title: 'Components/common/form/File Uploader',
    component: FileUploader,
    argTypes: {},
} as Meta<ArgTypes>

interface Args {
    id: string
}

interface ArgTypes {}

const Template: Story<Args> = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { FileUploader },
    template: '<FileUploader v-bind="$props" />',
})

export const Primary = Template.bind({})
Primary.args = {
    id: 'image-uploader',
}
