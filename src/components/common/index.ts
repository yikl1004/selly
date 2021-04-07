import { VueConstructor } from 'vue'

import DevMenu from '@components/common/DevMenu.vue'
import Link from '@components/common/Link.vue'
import Header from '@components/common/Header.vue'
import FileUploader from '@components/form/FileUploader.vue'
import TextField from '@components/form/TextField.vue'

const componentList: { [key: string]: VueConstructor }[] = [{ Link }, { DevMenu }, { FileUploader }, { Header }, { TextField }]

export { DevMenu, FileUploader, Link, Header, TextField }
export default componentList
