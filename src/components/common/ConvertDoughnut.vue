<template>
    <div>
        <DoughnutChart
            :chartData="datacollection"
            :options="chartOption"
            :width="220"
            :height="140"
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
    @Prop({ default: [] })
    readonly labels!: Array<string>
    @Prop({ default: [] })
    readonly datas!: Array<number>

    private datacollection = {}
    private chartOption: Chart.ChartOptions = {}
    mounted() {
        Chart.plugins.register(datalabels)

        this.fillData()
    }
    fillData() {
        this.chartOption = {
            // scales: {
            //     yAxes: [
            //         {
            //             ticks: {
            //                 callback(value, index, values) {
            //                     switch (index) {
            //                         case values.length - 1:
            //                             return '만원'
            //                         default:
            //                             return value
            //                     }
            //                 },
            //             },
            //         },
            //     ],
            // },
            responsive: true,
            animation: {
                onComplete(animation) {
                    console.log('animation onComplete')
                    console.log(this)
                    console.log(animation.chart.ctx)
                },
            },
            maintainAspectRatio: true,
            legend: {
                position: 'bottom',
                align: 'center',
            },
            tooltips: {
                enabled: true,
                position: 'average',
            },
            plugins: {
                legend: {
                    position: 'bottom',
                    align: 'end',
                },
                title: {
                    display: true,
                },
                datalabels: {
                    // color: 'red',
                    color: [
                        '#6c625a',
                        '#de2f13',
                        '#6c625a',
                        '#6c625a',
                        '#6c625a',
                    ],
                    font: {
                        weight: 'bold',
                    },
                    anchor: 'end',
                    // clamp: true,
                    align: 'end',
                    formatter(val, cont) {
                        return val + '%'
                        // console.log(val)
                        // console.log(cont)
                    },
                },
            },
        }
        this.datacollection = {
            datasets: [
                {
                    data: this.datas,
                    //'plus' | 'cross' | 'dash' | 'cross-dash' | 'dot' | 'dot-dash' | 'disc' | 'ring' | 'line' | 'line-vertical' | 'weave' | 'zigzag' | 'zigzag-vertical' | 'diagonal' | 'diagonal-right-left' | 'square' | 'box' | 'triangle' | 'triangle-inverted' | 'diamond' | 'diamond-box',
                    backgroundColor: [
                        '#6c625a',
                        patternnomaly.draw(
                            'diagonal-right-left',
                            '#de2f13',
                            'white',
                            5,
                        ),
                        patternnomaly.draw('dot', '#ba5903', 'black', 10),
                        patternnomaly.draw('square', '#8e7035', '#6c625a', 10),
                        patternnomaly.draw('zigzag', '#198571', 'black', 10),
                        patternnomaly.draw('dot', '#413a2f', 'white'),
                        patternnomaly.draw('diamond-box', '#00648c', 'white'),
                    ],
                    // ChartDataLabels: {},
                    // borderColor: ['#00648c'],
                    // borderWidth: 10,
                    // borderColor: 'black'
                },
            ],
            labels: this.labels,
        }
    }
}
</script>

<style scoped></style>
