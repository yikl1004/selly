<template>
    <div>
        <DoughnutChart
            :chartData="datacollection"
            :options="chartOption"
            :width="272"
            :height="240"
        />
        <router-view />
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import DoughnutChart from '@components/common/DoughnutChart.vue'
import Chart from 'chart.js'
import patternnomaly from 'patternomaly'
import datalabels from 'chartjs-plugin-datalabels'

@Component({
    components: { DoughnutChart },
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

    mounted() {
        Chart.plugins.register(datalabels)
        this.fillData()
    }
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
    // 차트 데이터 옵션 : 도넛
    //https://www.chartjs.org/docs/2.9.4/
    fillData() {
        console.log('도넛차트 맥스 하이라이트 표시 ::' + this.chartMax)
        this.chartOption = {
            layout: {
                padding: {
                    top: 15,
                },
            },
            responsive: true,
            maintainAspectRatio: false,
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
                    formatter(val /* cont */) {
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
