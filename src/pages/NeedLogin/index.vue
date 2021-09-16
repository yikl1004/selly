<template>
    <div>
        <h1>로그인이 필요한 페이지 입니다.</h1>
        <ul>
            <li>
                <BasicButton @click="toLoginPage">
                    로그인 페이지로 가기
                </BasicButton>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { Path } from '@router/routes'
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class NeedLoginPage extends Vue {
    toLoginPage() {
        this.$router.push(Path.Login)
    }
}
</script>

<style scoped></style>
