<template>
    <div class="container">
        <BoardDetail />

        <BasicButton type="medium">
            목록
        </BasicButton>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
    components: {},
})
export default class NoticeDetailPage extends Vue {}
</script>

<style scoped lang="scss" src="./NoticeDetailPage.scss" />
