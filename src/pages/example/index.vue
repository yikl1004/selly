<template>
	<div>
		<h1>테스트</h1>
		<!-- <TextField
            :list="list"
            label="통신사 선택"
            type="select"
            name="phoneNumber"
            :maxlength="13"
            @select="onSelect"
        /> -->
		<ButtonField label="인증번호" name="cert" button-text="전송" use="cert" :timer="timer" />
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { OptionItem } from '@/components/common/BottomSheet.vue'

@Component({
	components: {},
})
export default class ExamplePage extends Vue {
	private timer: { [key: string]: any } = { count: 3, unit: 'minute', format: 'm:ss' }
	private list: OptionItem[] = [
		{ displayName: 'KT', value: 'kt', selected: true },
		{ displayName: 'SKT', value: 'skt' },
		{ displayName: 'LG U+', value: 'lguplus' },
		{ displayName: 'KT알뜰폰', value: 'kt_sub' },
		{ displayName: 'SKT알뜰폰', value: 'skt_sub' },
		{ displayName: 'LGU+알뜰폰', value: 'lguplus_sub' },
	]
	private value: string = ''

	onSelect(option: OptionItem) {
		this.value = option.value

		this.list = this.list.map(item => {
			item.selected = item.value === option.value
			return item
		})
	}

	mounted() {
		console.log(this.$refs.buttonField)
	}
}
</script>

<style scoped></style>
