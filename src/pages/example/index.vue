<template>
    <div>
        <h1>테스트</h1>
        <DropdownBox id="phoneNumber" label="휴대폰번호" name="phone" :list.sync="list" />
        <TextField type="select" label="아무거나" :list.sync="list" name="anything" />
        <button type="button" @click="callApi">
            api 테스트
        </button>
        <div v-click-outside="hide" @click="toggle">
            Toggle
        </div>
        <div v-show="opened">
            Popup item
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace, Action } from 'vuex-class'
import ClickOutside from 'vue-click-outside'

const FinanceModule = namespace('finance')

@Component({
    directives: { ClickOutside },
})
export default class ExamplePage extends Vue {
    private timer: { [key: string]: any } = { count: 3, unit: 'minute', format: 'm:ss' }
    private list: DropdownBoxList = [
        { displayName: 'KT', value: 'kt', selected: true },
        { displayName: 'SKT', value: 'skt' },
        { displayName: 'LG U+', value: 'lguplus' },
        { displayName: 'KT알뜰폰', value: 'kt_sub' },
        { displayName: 'SKT알뜰폰', value: 'skt_sub' },
        { displayName: 'LGU+알뜰폰', value: 'lguplus_sub' },
    ]
    private value: string = ''
    private opened: boolean = false

    @FinanceModule.Action('getData')
    readonly getData!: Function

    onSelect(option: BottomSheetOptionItem) {
        this.value = option.value

        this.list = this.list.map(item => {
            item.selected = item.value === option.value
            return item
        })
    }

    mounted() {}

    callApi() {
        this.getData()
    }

    toggle() {
        this.opened = true
    }

    hide() {
        this.opened = false
    }
}
</script>

<style scoped></style>
