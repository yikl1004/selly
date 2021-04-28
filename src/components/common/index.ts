import { VueConstructor } from 'vue'

import Link from '@components/common/Link.vue'
import Header from '@components/common/Header.vue'
import FileUploader from '@components/form/FileUploader.vue'
import TextField from '@components/form/TextField.vue'
import BasicButton from '@components/common/BasicButton.vue'
import PersonalNumber from '@components/form/PersonalNumber.vue'

const componentList: { [key: string]: VueConstructor }[] = [
    { Link },
    { FileUploader },
    { Header },
    { TextField },
    { BasicButton },
    { PersonalNumber },
]

export { FileUploader, Link, Header, TextField }
export default componentList
