<template>
    <div>
        <BasicButton @click="login">
            로그인 하기
        </BasicButton>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

const AuthModule = namespace('auth')

@Component
export default class LoginPage extends Vue {
    @AuthModule.Action('getLoginInfo')
    readonly getLoginInfo!: Function

    @AuthModule.Action('loginCheck')
    readonly loginCheck!: Function

    @AuthModule.State('isLogin')
    readonly isLogin!: boolean

    @Watch('isLogin', { deep: true })
    changeIsLogin(newValue: boolean, oldValue: boolean) {
        console.log({ isLogin: newValue })
        newValue && this.$router.push({ name: 'Main' })
    }

    /**
     * @cateogry Methods
     */

    async login() {
        await this.getLoginInfo()
    }

    mounted() {
        this.loginCheck()
    }
}
</script>

<style scoped></style>
