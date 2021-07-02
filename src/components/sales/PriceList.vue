<template>
    <div class="price-list">
        <div class="sales-week-avg">
            <span>최근 7일 평균 매출</span>
            <em class="price"><strong>5,000,000</strong>원</em>
        </div>
        <ul>
            <li>
                <span>6/27 (일)</span>
                <em class="price"><strong>5,000,000</strong>원</em>
            </li>
            <li>
                <span>6/27 (일)</span>
                <em class="price"><strong>5,000,000</strong>원</em>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
    components: {},
})
export default class PriceList extends Vue {}
</script>

<style lang="scss" scoped src="./PriceList.scss"></style>
