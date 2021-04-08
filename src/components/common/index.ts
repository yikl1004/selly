import { VueConstructor } from 'vue'

import Link from '@components/common/Link.vue'
import Header from '@components/common/Header.vue'
import FileUploader from '@components/form/FileUploader.vue'
import TextField from '@components/form/TextField.vue'

const componentList: { [key: string]: VueConstructor }[] = [{ Link }, { FileUploader }, { Header }, { TextField }]

export { FileUploader, Link, Header, TextField }
export default componentList
