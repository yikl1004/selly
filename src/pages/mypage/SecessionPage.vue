<template>
    <div class="container floating">
        <div class="content">
            <div class="secession-wrap">
                <h2>Selly 회원 탈퇴를 위해서<br />아래 내용을 확인해주세요.</h2>
                <BulletList :list="secessionInfo" />
            </div>
        </div>

        <portal to="floating">
            <BasicButton size="large"> 내용 확인 후 탈퇴 </BasicButton>
        </portal>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class SecessionPage extends Vue {
    private secessionInfo = [
        {
            text:
                '진행중인 마케팅 있을 시 종료된 마케팅 대해서는 청구금액이 발생됩니다.',
        },
        {
            text:
                '보유한 대출상품이 있을 시 롯데카드에서 내용을 확인 가능합니다.',
        },
        {
            text:
                '장기카드 Biz론 대출상품 상환방식이 가맹점 대금상환(일)에서 청구서 상환(월)로 자동 변경됩니다.',
        },
        {
            text:
                '회원탈퇴 시 유통쇼핑데이터를 통한 콘텐츠 구매내역이 있을 경우 유통쇼핑데이터에서 확인이 불가합니다.',
        },
    ]
}
</script>

<style scoped lang="scss" src="./SecessionPage.scss"></style>
