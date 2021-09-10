<template>
    <div>
        <PieChart
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
import PieChart from '@components/common/PieChart.vue'
import Chart from 'chart.js'
import patternnomaly from 'patternomaly'

@Component({
    components: { PieChart },
})
export default class ConvertChart extends Vue {
    @Prop({ default: [] })
    readonly labels!: Array<string>
    @Prop({ default: [] })
    readonly datas!: Array<number>

    private datacollection = {}
    private chartOption: Chart.ChartOptions = {}
    mounted() {
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
            maintainAspectRatio: true,
            legend: {
                position: 'bottom',
                align: 'center',
            },
            plugins: {
                legend: {
                    position: 'bottom',
                    align: 'end',
                },
                title: {
                    display: true,
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
                },
            ],
            labels: this.labels,
        }
    }
}
</script>

<style scoped></style>
