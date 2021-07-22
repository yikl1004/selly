<template>
    <div class="popup-sales-management">
        <h3>사업장 매출의 정확한<br />집계가 필요하신가요?</h3>
        <p>
            Selly에서 제공하는 매출/입금내역 서비스는 사업장에서 발생하는 매출
            정보를 확인할 수 있는 기관을 통해 수집하여 제공하고 있습니다.
        </p>
        <p>
            현재 <strong>국세청, 여신협</strong> 등의 기관에서 정보를 수집하고
            있으며, 따라서 해당기관과 사업장의 연동 절차가 반드시 필요합니다.
        </p>
        <p>
            아래 연동관리 메뉴를 통해 혹시 빠진 연동기관이 있는지 다시 한번
            확인해보세요!
        </p>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
    components: {},
})
export default class PopupSalesManagement extends Vue {}
</script>

<style lang="scss" scoped src="./PopupSalesManagement.scss"></style>
