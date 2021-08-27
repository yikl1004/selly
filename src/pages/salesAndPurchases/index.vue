<template>
    <Page floating>
        <Header type="sub" :title="headerTitle" />
        <PageBody v-if="!whetherToScrape" class="floating">
            <div v-if="!whetherTolinkage" class="content">
                <DropdownBox
                    id="workingPlace"
                    label="사업장 선택"
                    type="large"
                    hiddenLabel
                    :list="workingPlaceList"
                    @select="onSelectWorkingPlace"
                />
                <div class="sales-main-box">
                    <div class="sale-main-title">
                        <h2>
                            데이터 수집 및 연동중입니다.<br />
                            연동 기관에 따라 <br />
                            순차적으로 적용됩니다.
                        </h2>
                        <p>
                            아래 연동관리 메뉴를 통해 혹시 빠진 연동기관이
                            있는지 다시 한번 확인해보세요!
                        </p>
                    </div>
                    <div class="img-box">
                        <img
                            src="/assets/sales/img_visual02.png"
                            alt="연동 이미지"
                        />
                    </div>
                </div>
            </div>
            <div v-else class="content">
                <DropdownBox
                    id="workingPlace"
                    label="사업장 선택"
                    type="large"
                    hiddenLabel
                    :list="workingPlaceList"
                    @select="onSelectWorkingPlace"
                />
                <div class="sales-main-box">
                    <div class="sale-main-title">
                        <h2>
                            매일 드리는 매출보고<br />카드, 현금, 배달 매출까지
                        </h2>
                        <p>
                            홈택스, 여신금융협회, 배달앱 등 계정연동 한번이면<br />
                            매일 매출, 입금 내역을 셀리에서 확인하실 수
                            있습니다.
                        </p>
                    </div>
                    <div class="img-box">
                        <img
                            src="/assets/sales/img_visual01.png"
                            alt="연동 이미지"
                        />
                    </div>
                </div>
            </div>

            <portal to="floating">
                <BasicButton size="large" @click="toBiznav">
                    데이터 연동
                </BasicButton>
            </portal>
        </PageBody>
        <router-view v-else />
    </Page>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { SalesModule } from '@stores/modules/sales'

/**
 * @description
 * 매출/입금 내역 조회 전 연동하는 페이지
 * 1. 페이지 진입 시 연동 됬는지 여부를 체크(연동 없음, 연동 있음, 연동 중)
 *      1-1. [O] 내역으로 redirect
 *      1-2. [X] 현재화면 계속 노출
 *      1-3. [-] 연동 중 화면 노출
 */
@Component
export default class SalesAndPurchasesPage extends Vue {
    /** 연동 여부 */
    get whetherTolinkage() {
        return SalesModule.whetherTolinkage
    }

    /** 스크래핑 여부 */
    get whetherToScrape() {
        return SalesModule.whetherToScrape
    }

    /** 사업장 정보 */
    get workingPlaceList() {
        return SalesModule.workingPlaceList
    }

    /** 연동 페이지인지 여부 */
    get isMain() {
        return this.$route.name === 'Sales Linkage'
    }

    /** 헤더 타이틀 */
    get headerTitle(): string {
        return this.$route.name === 'Sales' ? '매출 내역' : '입금 내역'
    }

    onSelectWorkingPlace(value: string) {
        console.log(value)
    }

    // 비즈냅 연동 (아이프레임)
    toBiznav() {
        if (document.getElementById('em_embed') !== null) {
            ;(document.getElementById(
                'em_embed',
            ) as HTMLDivElement).style.display = 'block'
        }
        this.$edkHost.openDataSync({
            orgSyncId: '',
            eventListener: event => {
                console.log('EVENT', event)
            },
        })
    }

    async created() {
        await SalesModule.getScrappingInfo()
    }

    beforeDestroy() {
        if (document.getElementById('em_embed') !== null) {
            ;(document.getElementById(
                'em_embed',
            ) as HTMLDivElement).style.display = 'none'
        }
    }
}
</script>

<style scoped lang="scss" src="./defaultStyle.scss" />
