<template>
    <div class="container">
        <div class="content">
            <BoardDetail />

            <BasicButton type="medium"> 목록 </BasicButton>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
    components: {},
})
export default class TermsDetailPage extends Vue {}
</script>
