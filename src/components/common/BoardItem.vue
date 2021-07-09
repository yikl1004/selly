<template>
    <!--[D] 상단고정 케이스는 pick 클래스 추가-->
    <Anchor href="/" class="board-item ">
        <div class="board-inner">
            <strong class="board-tit">
                개인사업자 회원표준약관 개정 안내 2줄까지 노출, 초과시 말줄임 처리개인사업자 회원표준약관 개정 안내 2줄까지 노출, 초과시
                말줄임 처리개인사업자 회원표준약관 개정 안내 2줄까지 노출, 초과시 말줄임 처리
            </strong>
            <div class="board-btm">
                <span class="date">2021.05.28</span>
            </div>
        </div>
    </Anchor>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class BoardItem extends Vue {}
</script>

<style lang="scss" scoped src="./BoardItem.scss"></style>
