import { VueConstructor } from 'vue'

import Link from '@components/common/Link.vue'
import Header from '@components/common/Header.vue'
import FileUploader from '@components/form/FileUploader.vue'
import TextField from '@components/form/TextField.vue'
import BasicButton from '@components/common/BasicButton.vue'
import SecretNumber from '@components/form/SecretNumber.vue'
import ButtonField from '@components/form/ButtonField.vue'
import BottomSheet from '@components/common/BottomSheet.vue'
import Timer from '@components/common/Timer.vue'

const componentList: { [key: string]: VueConstructor }[] = [
	{ Link },
	{ FileUploader },
	{ Header },
	{ TextField },
	{ BasicButton },
	{ SecretNumber },
	{ ButtonField },
	{ BottomSheet },
	{ Timer },
]

export { FileUploader, Link, Header, TextField }
export default componentList
