<template>
    <div class="container">
        <div class="select-store-wrap">
            <div class="select-store">
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
                        name="group"
                        :label="convertBizNoFormatter({ bizNo: item.bzno })"
                        :biz-name="item.bzmanNm"
                        :disabled="false"
                    />
                </div>
            </div>

            <ButtonField
                :id="null"
                label="추천인 코드(선택)"
                :hidden-label="null"
                :maxlength="9999"
                placeholder="추천인 코드 입력"
                :readonly="false"
                :disabled="false"
                :default-value="null"
                button-text="확인"
                :search="null"
                name="cert"
            />
        </div>
        <portal to="floating">
            <BasicButton size="large" @click="onNext">
                다음
            </BasicButton>
        </portal>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

const { State } = namespace('auth')

@Component
export default class SelectStorePage extends Vue {
    /** @category Stores */
    @State('memberWorkplaceInfo') readonly memberWorkplaceInfo!: MemberWorkplaceInfo

    /** @category Methods */

    onNext() {
        /**
         * 다음으로 이동
         * @event next
         */
        this.$emit('next')
    }
}
</script>
<style scoped lang="scss" src="./SelectStore.scss"></style>
