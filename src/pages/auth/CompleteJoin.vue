<template>
    <div class="container">
        <CautionBox
            type="complete"
            :title="`${bizmanName} 사장님, 반갑습니다! 셀리 회원가입이 완료되었습니다.`"
        />

        <div v-if="bizInfoList" class="complete-store-list">
            <div
                v-for="(item, index) in bizInfoList"
                :key="`biz-info-list-${index}`"
                class="store-box"
            >
                <i>{{ convertBizNoFormatter({ bizNo: item.bzno }) }}</i>
                <span class="store-name">{{ item.bzmanNm }}</span>
            </div>
        </div>
        <portal to="floating">
            <BasicButton size="large" @click="onComplete"> 확인 </BasicButton>
        </portal>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { AuthModule } from '@stores/modules/auth'

@Component
export default class CompleteJoinPage extends Vue {
    /** @category Stores */
    get bizInfoList() {
        return AuthModule.bizInfoList
    }

    get bizmanName() {
        return AuthModule.bizmanName
    }

    /** @category Methods */

    onComplete() {
        /**
         * 완료 이벤트
         * @event complete
         */
        this.$emit('complete')
    }
}
</script>

<style lang="scss" src="./CompleteJoin.scss"></style>
