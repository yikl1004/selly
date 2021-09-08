<template>
    <Page floating :footer="false">
        <Header type="proccess" title="LOCA MONEY Biz론" />
        <PageBody class="floating">
            <div class="content">
                <div class="ars-box">
                    <p class="text">
                        아래 버튼을 눌러 ARS연결 후 <br />
                        안내되는 <strong>인증번호 2자리</strong>를 입력해
                        주세요.
                    </p>
                    <div class="user-info">
                        <strong> 김*카님 010-12**-34** </strong>
                        <p>
                            롯데카드 대표번호(1588-8100)로<br />ARS인증이
                            진행됩니다.
                        </p>
                    </div>
                </div>
            </div>
            <portal to="floating">
                <BasicButton size="large"> ARS 전화요청 </BasicButton>
            </portal>
        </PageBody>
    </Page>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class LoanApplyFail extends Vue {}
</script>

<style scoped lang="scss" src="./AuthArs.scss" />
