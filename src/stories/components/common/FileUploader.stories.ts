import Vue from 'vue'
import { Meta, Story } from '@storybook/vue'
import FileUploader from '@components/form/FileUploader.vue'
import ImageUploader from 'vue-image-upload-resize'

Vue.use(ImageUploader)

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
