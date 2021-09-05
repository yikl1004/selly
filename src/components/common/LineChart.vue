<script>
// import { Component, Mixins, Prop, Watch } from 'vue-property-decorator'
import { Line, mixins } from 'vue-chartjs'
// import type { Chart } from 'chart.js'

// @Component({
//     extends: Line,
// })
// export default class LineChart extends Mixins(mixins.reactiveProp) {
//     @Prop({ type: Object, default: () => ({}), required: true })
//     readonly options!: Chart.ChartOptions

//     @Watch('chartData')
//     changeChartData() {
//         this.$data._chart.update()
//     }

//     mounted() {
//         console.log('차트 렌더====')

//         // Overwriting base render method with actual data.
//         this.options && this.renderChart(this.chartData, this.options)
//         console.log(this.chartData)
//         // this.renderChart({
//         //     labels: [
//         //         'January',
//         //         'February',
//         //         'March',
//         //         'April',
//         //         'May',
//         //         'June',
//         //         'July',
//         //         'August',
//         //         'September',
//         //         'October',
//         //         'November',
//         //         'December',
//         //     ],
//         //     datasets: [
//         //         {
//         //             label: 'test',
//         //             backgroundColor: '#f87979',
//         //             data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11],
//         //         },
//         //     ],
//         // })
//     }
// }

export default {
    extends: Line,
    mixins: [mixins.reactiveProp],
    props: {
        options: {
            type: Object,
            default: () => ({}),
            required: true,
        },
        chartData: {
            type: Object,
        },
    },

    watch: {
        chartData() {
            this.$data._chart.update()
        },
        options() {
            this.$data._chart.update()
        },
    },
    mounted() {
        console.log('차트 렌더====')

        // Overwriting base render method with actual data.
        this.options &&
            this.chartData &&
            this.renderChart(this.chartData, this.options)
        console.log(this.chartData)

        // this.renderChart({
        //     labels: [
        //         'January',
        //         'February',
        //         'March',
        //         'April',
        //         'May',
        //         'June',
        //         'July',
        //         'August',
        //         'September',
        //         'October',
        //         'November',
        //         'December',
        //     ],
        //     datasets: [
        //         {
        //             label: 'test',
        //             backgroundColor: '#f87979',
        //             data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11],
        //         },
        //     ],
        // })
    },
}
</script>
