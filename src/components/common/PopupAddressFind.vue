<template>
    <div class="popup-address-find">
        <ButtonField
            id="addressSearch"
            label="주소 검색"
            :hidden-label="true"
            placeholder="도로명, 건물번호, 지번 입력"
            :readonly="false"
            :disabled="false"
            :default-value="null"
            button-text="검색"
            :cert="false"
            :search="null"
            name="search"
        />
        <p class="txt-search-info">
            예시 : 도로명(양녕로 25길), 건물번호(39-1)
        </p>

        <!--[D] 검색결과 없음-->
        <CautionBox description="검색된 내용이 없습니다." />

        <!--[D] 검색결과 리스트-->
        <div class="address-list">
            <AddressItem />
        </div>
        <BasicButton type="more">
            더보기
        </BasicButton>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class PopupAddressFind extends Vue {}
</script>

<style lang="scss" scoped src="./PopupAddressFind.scss"></style>
