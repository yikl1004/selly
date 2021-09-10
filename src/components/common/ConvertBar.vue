<template>
    <div>
        <h1>접근성 차트</h1>
        <BarChart
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
import BarChart from '@components/common/BarChart.vue'
import Chart from 'chart.js'

@Component({
    components: { BarChart },
})
export default class ConvertChart extends Vue {
    @Prop({ default: [] })
    readonly labels!: Array<string>
    @Prop({ default: [] })
    readonly datas!: Array<number>

    private datacollection = {}
    // private datas = [30, 20, 20, 30, 40, 40, 50]
    // private labels = ['일', '월', '화', '수', '목', '금', '토']
    private chartOption: Chart.ChartOptions = {}
    mounted() {
        this.fillData()
    }
    fillData() {
        console.log('Fill DATA =======')
        this.chartOption = {
            scales: {
                yAxes: [
                    {
                        ticks: {
                            callback(value, index, values) {
                                switch (index) {
                                    case values.length - 1:
                                        return '만원'
                                    default:
                                        return value
                                }
                            },
                            beginAtZero: true,
                        },
                    },
                ],
            },
            legend: {
                display: false,
            },
            responsive: true,
            maintainAspectRatio: true,
        }
        this.datacollection = {
            datasets: [
                {
                    data: this.datas,
                    backgroundColor: '#de2f13',
                    barPercentage: 0.5,
                    categoryPercentage: 0.55,
                },
            ],
            labels: this.labels,
        }
    }
}
</script>
<style scoped></style>
