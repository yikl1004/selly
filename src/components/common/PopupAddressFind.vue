<template>
    <div class="popup-inner">
        <div class="popup-address-find">
            <ButtonField
                id="addressSearch"
                name="search"
                label="주소 검색"
                button-text="검색"
                placeholder="도로명, 건물번호, 지번 입력"
                hidden-label
                @search="searchJuso"
            />
            <p class="txt-search-info">
                예시 : 도로명(양녕로 25길), 건물번호(39-1)
            </p>

            <!--[D] 검색결과 리스트-->
            <div v-if="hasList" class="address-list">
                <AddressItem
                    v-for="(item, index) in list"
                    :key="`address-item-${index}`"
                    :jibun="item.jibunAddr"
                    :road="item.roadAddrPart1"
                    :zipcode="item.zipNo"
                    @select="onSelect"
                />
            </div>
            <!--[D] 검색결과 없음-->
            <CautionBox v-else description="검색된 내용이 없습니다." />

            <BasicButton v-if="visibleMoreButton" type="more" @click="more">
                더보기
            </BasicButton>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import JusoService from '@services/juso'
import type { JusoItem } from '@services/juso'

interface Paging {
    totalCount: number
    currentPage: number
    countPerPage: number
}

interface ErrorState {
    errorCode: string
    errorMessage: string
}

@Component
export default class PopupAddressFind extends Vue {
    /** API 호출 상태 */
    private pending = false

    /** 주소 목록 */
    private list: JusoItem[] = []

    /** 페이징 */
    private paging: Paging = {
        totalCount: 1,
        currentPage: 1,
        countPerPage: 1,
    }

    /** 에러 */
    private error: ErrorState = {
        errorCode: '',
        errorMessage: '',
    }

    /** 검색 키워드 */
    private keyword = ''

    /** 더보기 버튼 노출여부 */
    private visibleMoreButton = false

    /** @Computed */
    get hasList(): boolean {
        return !!this.list.length
    }

    /** @Methods */

    /** 검색 */
    async search(keyword: string, nextPage?: string): Promise<void> {
        const { toNumber, isUndefined } = this._
        this.keyword = keyword
        this.pending = true
        const response = await JusoService.search(keyword, nextPage)
        this.pending = false

        const common = response.data.results.common
        const totalCount = toNumber(common.totalCount)
        const currentPage = toNumber(common.currentPage)
        const countPerPage = toNumber(common.countPerPage)
        const jusoList = response.data.results.juso

        this.list = isUndefined(nextPage)
            ? jusoList
            : (this.list = this.list.concat(jusoList))
        this.paging = { totalCount, currentPage, countPerPage }

        // 더보기 버튼 노출 설정
        this.setVisibleMoreButton(currentPage, totalCount, countPerPage)
    }

    async searchJuso(keyword: string) {
        await this.search(keyword)
    }

    async more() {
        const nextPage = `${this.paging.currentPage + 1}`

        await this.search(this.keyword, nextPage)
    }

    setVisibleMoreButton(
        currentPage: number,
        totalCount: number,
        countPerPage: number,
    ) {
        const totalPage = Math.ceil(totalCount / countPerPage)

        this.visibleMoreButton = currentPage < totalPage
    }

    onSelect({ zipcode, road }: { zipcode: string; road: string }) {
        /**
         * @event select
         * 선택 했을 때
         */
        this.$emit('select', { zipcode, road })
    }
}
</script>

<style lang="scss" scoped src="./PopupAddressFind.scss"></style>
1
