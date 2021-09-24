<template>
    <div>
        <PieChart
            :chartData="datacollection"
            :options="chartOption"
            :width="272"
            :height="210"
        />
        <router-view />
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import PieChart from '@components/common/PieChart.vue'
import Chart from 'chart.js'
import patternnomaly from 'patternomaly'
import datalabels from 'chartjs-plugin-datalabels'

@Component({
    components: { PieChart },
})
export default class ConvertChart extends Vue {
    @Prop({ type: Array, default: [] })
    readonly labels!: Array<string>
    @Prop({ type: Array, default: [] })
    readonly datas!: Array<number>
    @Prop({ type: Boolean, default: false })
    readonly chartMax!: boolean

    private datacollection: Chart.ChartData = {}
    private chartOption: Chart.ChartOptions = {}

    //데이터 라벨  컬러셋
    //https://v1_0_0--chartjs-plugin-datalabels.netlify.app/
    private palette = [
        '#6c625a',
        '#de2f13',
        '#ba5903',
        '#8e7035',
        '#198571',
        '#413a2f',
        '#00648c',
    ]
    //차트 접근성 패턴
    //'plus' | 'cross' | 'dash' | 'cross-dash' | 'dot' | 'dot-dash' | 'disc' | 'ring' | 'line' | 'line-vertical' | 'weave' | 'zigzag' | 'zigzag-vertical' | 'diagonal' | 'diagonal-right-left' | 'square' | 'box' | 'triangle' | 'triangle-inverted' | 'diamond' | 'diamond-box',
    private backgroundPalette = [
        '#6c625a',
        patternnomaly.draw('diagonal-right-left', '#de2f13', 'white', 5),
        patternnomaly.draw('dot', '#ba5903', 'black', 10),
        patternnomaly.draw('square', '#8e7035', '#6c625a', 10),
        patternnomaly.draw('zigzag', '#198571', 'black', 10),
        patternnomaly.draw('dot', '#413a2f', 'white'),
        patternnomaly.draw('diamond-box', '#00648c', 'white'),
    ]
    // 원형차트 보더간격을 색으로 채워서 하이라이트처럼...
    borderColor() {
        const maxData = this.datas.indexOf(Math.max(...this.datas))
        const checkPalette = this.palette.map((obj, index) => {
            console.log(maxData)
            return maxData === index ? this.backgroundPalette[index] : '#FFFFFF'
        })
        return checkPalette
    }
    // 원형차트 보더간격을 조정하여 하이라이트처럼...
    borderWidth() {
        const maxData = this.datas.indexOf(Math.max(...this.datas))
        const checkWidth = this.palette.map((obj, index) => {
            return maxData === index ? 10 : 2
        })
        return checkWidth
    }
    // 차트 데이터 옵션 : 파이
    //https://www.chartjs.org/docs/2.9.4/
    mounted() {
        console.log('파이차트 맥스 하이라이트 표시 ::' + this.chartMax)
        Chart.plugins.register(datalabels)
        this.fillData()
    }
    fillData() {
        console.log(this.datas.indexOf(Math.max(...this.datas)))
        this.chartOption = {
            layout: {
                padding: {
                    top: 20,
                },
            },
            responsive: true,
            maintainAspectRatio: true,
            legend: {
                position: 'bottom',
                align: 'center',
                labels: {
                    padding: 20,
                },
            },
            tooltips: {
                enabled: false,
            },
            plugins: {
                datalabels: {
                    color: this.palette,
                    font: {
                        weight: 'bold',
                    },
                    anchor: 'end',
                    align: 'end',
                    formatter(val) {
                        return val + '%'
                    },
                },
            },
        }
        this.datacollection = {
            datasets: [
                {
                    data: this.datas,
                    backgroundColor: this.backgroundPalette,
                    borderColor: this.chartMax ? this.borderColor() : '#FFFFFF',
                    borderWidth: this.chartMax ? this.borderWidth() : 2,
                },
            ],
            labels: this.labels,
        }
    }
}
</script>

<style scoped></style>
