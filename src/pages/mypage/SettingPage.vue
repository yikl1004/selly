<template>
    <div class="container">
        <div class="content">
            <div class="setting-wrap">
                <div class="setting-box">
                    <h2>회원정보</h2>
                    <ul>
                        <li>
                            <em class="setting-name">이름</em>
                            <strong class="setting-cont">김*카</strong>
                        </li>

                        <li>
                            <em class="setting-name">이메일</em>
                            <strong class="setting-cont">lo******@email.com</strong>
                        </li>

                        <li>
                            <em class="setting-name">휴대폰관리</em>
                            <strong class="setting-cont">010-***-4567</strong>
                        </li>
                    </ul>
                </div>
                <div class="setting-box">
                    <h2>혜택알림 동의</h2>
                    <ul>
                        <li>
                            <em class="setting-name">SMS</em>
                            <strong class="setting-cont"> <SwitchButton label="선택하세요" :value="switchValue1"/></strong>
                        </li>

                        <li>
                            <em class="setting-name">친구톡</em>
                            <strong class="setting-cont"> <SwitchButton label="선택하세요" :value="switchValue1"/></strong>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="btn-area">
                <BasicButton type="textGray">
                    회원탈퇴
                </BasicButton>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
@Component
export default class SettingPage extends Vue {
    private switchValue1: boolean = true
}
</script>

<style scoped lang="scss" src="./SettingPage.scss"></style>
