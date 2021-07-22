<template>
    <div class="container">
        <div class="content pd-btm">
            <BoardItem
                v-for="(item, index) in termsList"
                :key="`board-item-${index}`"
                :index="index"
                :title="item.title"
            />
            <BasicButton type="more"> 더보기 </BasicButton>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class TermsPage extends Vue {
    // 이용약관 샘플
    private termsList = [
        {
            title: '표준 여신거래 기본약관',
        },
        {
            title: '개인 신용정보 필수/선택적 동의서',
        },
    ]
}
</script>
