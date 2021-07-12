<template>
    <div class="container no-padding">
        <div class="notice-wrap">
            <BoardItem />
            <BasicButton type="more">
                더보기
            </BasicButton>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
    components: {},
})
export default class NoticePage extends Vue {}
</script>

<style scoped lang="scss" src="./NoticePage.scss" />
