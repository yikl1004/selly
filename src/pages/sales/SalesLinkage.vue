<template>
    <div class="container">
        <div class="content">
            <div class="sales-linkage-box">
                <h2>
                    데이터 수집 및 연동중이며,<br />선택하신 연동 기관에 따라
                    <br />순차적으로 적용될 수 있습니다.
                </h2>
            </div>
            <BasicButton type="large"> 추가연동 </BasicButton>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class SalesLinkage extends Vue {}
</script>

<style scoped lang="scss" src="./SalesLinkage.scss" />
