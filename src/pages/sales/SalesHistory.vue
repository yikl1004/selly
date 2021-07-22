<template>
    <div class="container">
        <div class="select-buisnessman-box">
            <DropdownBox
                id="dropdown-box01"
                label="사업자 선택"
                :hidden-label="true"
                :list="dropdownBoxList"
                default-value="전체"
                :disabled="false"
            />
        </div>
        <Tab :list="tabList" :active="0" type="solid">
            <template slot-scope="{ activeIndex }">
                <div v-if="activeIndex === 0" class="tab-inner">
                    <SalesHistoryDetail />
                </div>
                <div v-if="activeIndex === 1" class="tab-inner">
                    <p>주간</p>
                </div>
                <div v-if="activeIndex === 2" class="tab-inner">
                    <p>요일별</p>
                </div>
            </template>
        </Tab>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import SalesHistoryDetail from '@components/sales/SalesHistoryDetail.vue'
import type { DropdownBoxList } from '@components/form/DropdownBox.vue'

@Component({
    components: {
        SalesHistoryDetail,
    },
})
export default class SalesHistory extends Vue {
    //드롭다운리스트 샘플
    private dropdownBoxList: DropdownBoxList = [
        { displayName: '전체', value: 'all', selected: true },
        {
            displayName: '이층집 강남점 222-20-2222',
            value: 'LOCA MONEY:BIZ 7*3*',
        },
        {
            displayName: '이층집 강남점 222-20-2222',
            value: '가장최근에 받은 카드가 디폴트로 노출',
        },
    ]

    private tabList = [{ name: '일간' }, { name: '주간' }, { name: '요일별' }]
}
</script>

<style lang="scss" scoped src="./SalesHistory.scss"></style>
