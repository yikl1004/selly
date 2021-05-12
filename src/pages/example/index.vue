<template>
    <div>
        <h1>테스트</h1>
        <DropdownBox id="phoneNumber" label="휴대폰번호" name="phone" :list="list" />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { OptionItem } from '@/components/common/BottomSheet.vue'
import DropdownBox from '@components/common/DropdownBox.vue'

@Component({
    components: {
        DropdownBox,
    },
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
