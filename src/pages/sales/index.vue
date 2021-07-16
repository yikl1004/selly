<template>
    <div v-if="isMain" class="container">
        <div class="content">
            <div class="sales-main-box">
                <div class="sale-main-title">
                    <h2>매일 드리는 매출보고<br />카드, 현금, 배달 매출까지</h2>
                    <p>홈택스, 여신금융협회, 배달앱 등 계정연동 한번이면<br />매일 매출, 입금 내역을 셀리에서 확인하실 수 있습니다.</p>
                </div>
                <BasicButton type="large">
                    매출연동
                </BasicButton>

                <AddressField id="a" label="주소" :hidden-label="''" :readonly="false" :disabled="false" :default-value="''" />
            </div>
        </div>
    </div>
    <router-view v-else />
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'

@Component
export default class SalesPages extends Vue {
    /**
     * @category Data
     */
    onClick() {
        console.log('다음버튼 클릭')
    }

    get isMain() {
        return this.$route.name === 'Sales'
    }
}
</script>

<style scoped lang="scss" src="./defaultStyle.scss" />
