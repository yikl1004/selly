<template>
    <div class="container">
        <div class="select-store-wrap">
            <div class="select-store">
                <div class="store-user-info">
                    <strong>
                        김로카 사장님<br />
                        사업자정보를 확인하세요.
                    </strong>
                    <p>현재 등록된 2개의 사업자 가입이 가능합니다.<br />선택한 사업자만 셀리 서비스에 가입됩니다.</p>
                </div>

                <div class="user-store-list">
                    <CheckBoxBlock name="group" title="타이틀" label="체크박스내용" :disabled="false" />
                    <CheckBoxBlock name="group" title="타이틀" label="체크박스내용" :disabled="false" />
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
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class SelectStorePage extends Vue {}
</script>
<style scoped lang="scss" src="./SelectStore.scss"></style>
