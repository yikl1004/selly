<template>
    <Page>
        <Header type="sub" title="사업자 정보" />
        <PageBody>
            <div v-if="businessManInfo" class="content">
                <div class="business-wrap">
                    <DropdownBox
                        id="dropdown-box01"
                        label="사업자 선택"
                        :list="businessManList"
                        type="large"
                        @select="onSelectBusinessMan"
                    />
                    <div class="btn-area">
                        <BasicButton
                            type="textBlue"
                            @click="openPopupAddBusinessMan"
                        >
                            사업자 추가 및 해지
                        </BasicButton>
                    </div>
                    <ButtonField
                        id="name"
                        label="사업자명"
                        placeholder="사업자 1"
                        button-text="입력"
                        name="cert"
                        error-message="사업자명을 정확하게 입력해주세요."
                        :default-value="currentBusinessInfo.bzmanNm"
                        @search="onChangeBusinessManName"
                    />
                    <BtnGroup>
                        <BasicButton type="medium">
                            매출/입금 연동
                        </BasicButton>
                    </BtnGroup>
                    <div class="franchisee-list-box">
                        <strong class="title">가맹점 정보</strong>
                        <BoardItem
                            v-for="(item, index) in franchiseList"
                            :key="`board-item-${index}`"
                            :index="index"
                            :title="item.mcNm"
                            @click="() => toFranchise(index)"
                        />
                    </div>
                </div>
            </div>
            <FullPopup
                title="사업자 추가 및 해지"
                type="popup"
                :show.sync="showAddBusinessManPopup"
                :button-text="{ confirm: '저장' }"
                @confirm="onConfirm"
            >
                <SelectStore type="addBusiness" />
            </FullPopup>
        </PageBody>
    </Page>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import SelectStore from '@pages/auth/SelectStore.vue'
import PageView from '@utils/mixins/PageView'
import type { DropdownBoxList } from '@components/form/DropdownBox.vue'
import { AuthModule } from '@stores/modules/auth'
import type { Schema } from '@components/form/FormProvider.vue'
import type { BusinessManInfoListItem, FranchiseItem } from '@services/auth'
import { Path } from '@router/routes'

@Component({
    components: { SelectStore },
})
export default class BusinessPage extends Mixins(PageView) {
    get businessManInfo() {
        return AuthModule.businessManInfo
    }

    get businessManList() {
        return AuthModule.businessManList
    }

    /** @Data */

    /** 사업자 추가 팝업 노출 */
    private showAddBusinessManPopup = false

    /** @Computed */

    // 가맹점 리스트
    get franchiseList(): FranchiseItem[] {
        const selectedItem = this.businessManList.find(item => item.selected)
        if (selectedItem) {
            const findList = this.businessManInfo
                ? this.businessManInfo.list.find(item => item.selected)?.subList
                : []

            return findList || []
        } else {
            return []
        }
    }

    // 현재 선택된 사업자 정보
    get currentBusinessInfo(): BusinessManInfoListItem {
        return this.businessManInfo?.list.find(
            item => item.selected,
        ) as BusinessManInfoListItem
    }

    /** @Methods */

    /**
     * 사업자 추가 팝업 열기
     */
    async openPopupAddBusinessMan() {
        await AuthModule.getMemberWorkplaceInfo()
        this.showAddBusinessManPopup = true
    }

    /**
     * 가맹점 정보 페이지로 이동
     */
    toFranchise(index: number) {
        const mcno = this.franchiseList[index].mcno
        this.$router.push({
            ...Path.Franchise,
            params: { mcno },
        })
    }

    async onChangeBusinessManName(bzmanNm: string) {
        const bzno = this.currentBusinessInfo.bzno
        await AuthModule.updateBusinessManName({ bzno, bzmanNm })
        await AuthModule.getBusinessManInfo()
    }

    onSelectBusinessMan(value: string) {
        AuthModule.selectBusinessMan(value)
    }

    /** @LifeCycle */

    async created() {
        await AuthModule.getBusinessManInfo()
    }

    /** 개발 적용 전... */

    // s: popup
    private popShow = false
    openPopup() {
        this.popShow = true
    }
    onConfirm() {
        this.popShow = false
    }
    // e: popup

    //드롭다운리스트 샘플
    private dropdownBoxList: DropdownBoxList = [
        {
            displayName: 'LOCA MONEY:BIZ 7*3*',
            value: 'LOCA MONEY:BIZ 7*3*',
            selected: true,
        },
        {
            displayName: '가장최근에 받은 카드가 디폴트로 노출',
            value: '가장최근에 받은 카드가 디폴트로 노출',
        },
    ]

    private data: Schema = {
        dropdownBox: 'kt',
        buttonField: '확인',
        calendarField: new Date('2021.06.04'),
        checkSingle: true,
        secretNumber: '1234561',
        singleSelection: 'third',
        switchButton: true,
        textfieldPrimary: '테스트',
    }

    formChange(data: Schema) {
        this.data = data
    }

    onSubmit(data: Schema) {
        console.log(data)
    }
}
</script>

<style lang="scss" src="./BusinessPage.scss"></style>
