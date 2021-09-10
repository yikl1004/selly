<script lang="ts">
import { Component, Mixins, Prop } from 'vue-property-decorator'
import { Bar, mixins } from 'vue-chartjs'
import Chart from 'chart.js'
@Component
export default class BarChart extends Mixins(mixins.reactiveProp, Bar) {
    @Prop({ type: Object, default: () => ({}), required: true })
    readonly chartData!: Chart.ChartData
    @Prop({ type: Object, default: () => ({}), required: false })
    readonly options!: Chart.ChartOptions
    mounted() {
        this.renderChart(this.chartData, this.options)
    }
}
</script>
