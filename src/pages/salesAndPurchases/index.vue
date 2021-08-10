<template>
    <Page>
        <Header type="sub" title="매출 내역" />
        <PageBody v-if="isMain">
            <div v-if="isLinkPending" class="content">
                <div class="sales-linkage-box">
                    <h2>데이터 수집 및 연동중이며,<br />선택하신 연동 기관에 따라 <br />순차적으로 적용될 수 있습니다.</h2>
                </div>
                <DropdownBox id="workingPlace" label="사업장 선택" hiddenLabel :list="workingPlaceList" @select="onSelectWorkingPlace" />
                <BasicButton type="large"> 추가연동 </BasicButton>
            </div>
            <div class="content">
                <div class="sales-main-box">
                    <div class="sale-main-title">
                        <h2>매일 드리는 매출, 입금보고<br />카드, 현금, 배달 매출까지</h2>
                        <p>홈택스, 여신금융협회, 배달앱 등 계정연동 한번이면<br />매일 매출, 입금 내역을 셀리에서 확인하실 수 있습니다.</p>
                    </div>
                    <DropdownBox
                        id="workingPlace"
                        label="사업장 선택"
                        hiddenLabel
                        :list="workingPlaceList"
                        @select="onSelectWorkingPlace"
                    />
                    <BasicButton type="large"> 데이터 연동 </BasicButton>
                </div>
            </div>
        </PageBody>
        <router-view v-else />
    </Page>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import type { DropdownBoxList } from '@components/form/DropdownBox.vue'

/**
 * @description
 * TODO: 연동 여부 확인 하는 API 요청 해야 함!!!
 * 매출/입금 내역 조회 전 연동하는 페이지
 * 1. 페이지 진입 시 연동 됬는지 여부를 체크(연동 없음, 연동 있음, 연동 중)
 *      1-1. [O] 내역으로 redirect
 *      1-2. [X] 현재화면 계속 노출
 *      1-3. [ ] 연동 중 화면 노출
 */
@Component
export default class SalesPages extends Vue {
    private workingPlaceList: DropdownBoxList = [
        { displayName: '국대떡볶이', value: '1101123423' },
        { displayName: '나이키', value: '1230012312' },
        { displayName: '아디다스', value: '4348898798' },
        { displayName: '샘숭전자', value: '5673320920' },
    ]

    get isMain() {
        return this.$route.name === 'Sales Linkage'
    }

    get isLinkPending(): boolean {
        return false
    }

    onSelectWorkingPlace(value: string) {
        console.log(value)
    }
}
</script>

<style scoped lang="scss" src="./defaultStyle.scss" />
