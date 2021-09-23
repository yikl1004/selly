<template>
    <Page :footer="!isDirect">
        <Header :type="headerType" title="이용약관" />
        <PageBody>
            <div class="content">
                <BoardDetail :title="detail.title" :content="detail.content" />
                <BasicButton type="medium" @click="onClickBackOrConfirm">
                    {{ isDirect ? '확인' : '목록' }}
                </BasicButton>
            </div>
        </PageBody>
    </Page>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { BoardModule } from '@stores/modules/board'

/**
 * @description
 * 약관 공통 페이지
 * 직접 접근 허용
 * 회원가입 - AGR_MBR, PRV_1 : /config/terms/detail?comGrpC=AGR_MBR&comC=PRV_1
 * 이용약관 - AGR_COM, PRV_1 : /config/terms/detail?comGrpC=AGR_COM&comC=PRV_1
 */
@Component
export default class TermsDetailPage extends Vue {
    get policyDetailData() {
        return BoardModule.policyDetailData
    }

    // 직접 호출 상세 데이터
    get policyDetailDirectData() {
        return BoardModule.policyDetailDirectData
    }

    // 상세 데이터
    get detail() {
        const prvSeq = this.$route.query.no
        if (prvSeq) {
            return this.policyDetailData
        } else {
            return this.policyDetailDirectData
        }
    }

    // 직접 호출 케이스 인지 판단
    get isDirect() {
        return !this.$route.query.prvSeq
    }

    // 헤더 타입 props
    get headerType() {
        if (this.isDirect) {
            return 'title'
        } else {
            return 'sub'
        }
    }

    onClickBackOrConfirm() {
        if (this.isDirect) {
            window.close()
        } else {
            this.$router.back()
        }
    }

    async created() {
        const prvSeq = this.$route.query.no as string
        const comGrpC = (this.$route.query.comGrpC as string) || ''
        const comC = (this.$route.query.comC as string) || ''

        if (prvSeq) {
            await BoardModule.getPolicyDetail({ prvSeq })
        } else if (comGrpC && comC) {
            await BoardModule.getPolicyDetailDirect({
                comGrpC,
                comC,
            })
        }
        // else {
        //     this.$modal.open({
        //         message: '잘못된 접근입니다. '
        //     })
        // }
    }
}
</script>
