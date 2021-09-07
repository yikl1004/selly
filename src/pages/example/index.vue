<template>
    <div>
        <h1>접근성 차트</h1>
        <!-- <DropdownBox id="phoneNumber" label="휴대폰번호" name="phone" :list.sync="list" />
        <TextField type="select" label="아무거나" :list.sync="list" name="anything" />
        <button type="button" @click="callApi">
            api 테스트
        </button>
        <div v-click-outside="hide" @click="toggle">
            Toggle
        </div>
        <div v-show="opened">
            Popup item
        </div> -->
        <DoughnutChart
            :chartData="datacollection"
            :options="chartOption"
            :width="320"
            :height="200"
        />
        <router-view />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ClickOutside from 'vue-click-outside'
import type { BottomSheetOptionItem } from '@components/common/BottomSheet.vue'
import type { DropdownBoxList } from '@components/form/DropdownBox.vue'
import DoughnutChart from '@components/common/DoughnutChart.vue'
import Chart from 'chart.js'
import patternnomaly from 'patternomaly'
// import { FinanceModule } from '@stores/modules/finance'

@Component({
    directives: { ClickOutside },
    components: { DoughnutChart },
})
export default class ExamplePage extends Vue {
    private timer: { [key: string]: any } = {
        count: 3,
        unit: 'minute',
        format: 'm:ss',
    }
    private list: DropdownBoxList = [
        { displayName: 'KT', value: 'kt', selected: true },
        { displayName: 'SKT', value: 'skt' },
        { displayName: 'LG U+', value: 'lguplus' },
        { displayName: 'KT알뜰폰', value: 'kt_sub' },
        { displayName: 'SKT알뜰폰', value: 'skt_sub' },
        { displayName: 'LGU+알뜰폰', value: 'lguplus_sub' },
    ]
    private value = ''
    private opened = false

    onSelect(option: BottomSheetOptionItem) {
        this.value = option.value

        this.list = this.list.map(item => {
            item.selected = item.value === option.value
            return item
        })
    }

    toggle() {
        this.opened = true
    }

    hide() {
        this.opened = false
    }
    private datacollection: Chart.ChartData = {}
    private chartOption: Chart.ChartOptions = {}

    mounted() {
        console.log('MOUNTED =======')
        this.fillData()
    }
    fillData() {
        console.log('Fill DATA =======')
        this.chartOption = {}
        this.datacollection = {
            datasets: [
                {
                    data: [10, 20, 30],
                    backgroundColor: [
                        patternnomaly.draw('square', '#1f77b4', 'black'),
                        patternnomaly.draw('disc', '#ff7f0e', 'black'),
                        patternnomaly.draw('diamond', '#2ca02c', 'black'),
                    ],
                },
            ],
            labels: ['Red', 'Yellow', 'Blue'],
        }
    }
}
</script>

<style scoped></style>
