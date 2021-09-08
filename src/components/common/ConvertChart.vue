<template>
    <div>
        <h1>접근성 차트</h1>
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
import { Component, Vue, Prop } from 'vue-property-decorator'
import DoughnutChart from '@components/common/DoughnutChartCl.vue'
import Chart from 'chart.js'
import patternnomaly from 'patternomaly'

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
        console.log('MOUNTED =======')
        console.log(this.labels)
        console.log(this.datas)
        this.fillData()
    }
    fillData() {
        console.log('Fill DATA =======')
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
                    backgroundColor: [
                        '#6c625a',
                        patternnomaly.draw('square', '#de2f13', 'black'),
                        patternnomaly.draw('disc', '#de2f13', 'green'),
                        patternnomaly.draw('diamond', '#2ca02c', 'black'),
                        patternnomaly.draw('diamond', '#2c111c', 'black'),
                        patternnomaly.draw('diamond', '#2c302c', 'black'),
                    ],
                },
            ],
            labels: this.labels,
        }
    }
}
</script>

<style scoped></style>
