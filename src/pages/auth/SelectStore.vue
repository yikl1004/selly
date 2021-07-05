<template>
    <div class="container">
        <div class="select-store-wrap">
            <div v-if="memberWorkplaceInfo" class="select-store">
                <div class="store-user-info">
                    <strong>
                        {{ memberWorkplaceInfo.data.mbrNm }} 사장님<br />
                        사업자정보를 확인하세요.
                    </strong>
                    <p>
                        현재 등록된 {{ memberWorkplaceInfo.data.list.length }}개의 사업자 가입이 가능합니다.<br />선택한 사업자만 셀리
                        서비스에 가입됩니다.
                    </p>
                </div>

                <div class="user-store-list">
                    <CheckBoxBlock
                        v-for="(item, index) in memberWorkplaceInfo.data.list"
                        :id="`userStoreList${index}`"
                        :key="`user-store-list-item-${index}`"
                        :label="convertBizNoFormatter({ bizNo: item.bzno })"
                        :biz-name="item.bzmanNm"
                        :index="index"
                        name="group"
                        @change="onSelectBizNo"
                    />
                </div>

                <ButtonField
                    id="recommenderCode"
                    label="추천인 코드(선택)"
                    :maxlength="9999"
                    placeholder="추천인 코드 입력"
                    :readonly="false"
                    :disabled="false"
                    button-text="확인"
                    name="cert"
                />
            </div>
            <portal to="floating">
                <BasicButton :disabled="!selectedWorkplace.length" size="large" @click="onNext">
                    다음
                </BasicButton>
            </portal>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { OnSelectValue } from '@components/form/CheckBoxBlock.vue'
import { BizInfoItem } from '@services/auth'

const { State } = namespace('auth')

@Component
export default class SelectStorePage extends Vue {
    /** @category Stores */
    @State('memberWorkplaceInfo') readonly memberWorkplaceInfo!: MemberWorkplaceInfo

    /** @category Data */

    // 선택된 사업장 정보
    private selectedWorkplace: BizInfoItem[] = []

    /** @category Methods */

    onNext() {
        /**
         * 다음으로 이동
         * @event next
         */
        this.$emit('next', this.selectedWorkplace)
    }

    onSelectBizNo(data: OnSelectValue) {
        const originList = this.memberWorkplaceInfo.data.list
        const { bzno, ltRgyn: rgyn } = originList[data.index]

        if (data.value) {
            this.selectedWorkplace.push({ bzno, rgyn })
        } else {
            this.selectedWorkplace.splice(data.index, 1)
        }
    }
}
</script>
<style scoped lang="scss" src="./SelectStore.scss"></style>
