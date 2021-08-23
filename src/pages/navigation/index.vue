<template>
    <Page>
        <section class="box-gnb-wrap">
            <div class="gnb-header">
                <h2>
                    <Anchor href="/" class="logo">
                        <span class="ir">Selly</span>
                    </Anchor>
                </h2>
                <button type="button" class="btn-gnb-close" @click="onClose">
                    <span class="ir">메뉴 닫기</span>
                </button>
            </div>
            <div class="user-info">
                <strong class="user-name">{{ userName }}님</strong>
                <BasicButton type="textGray" @click="logout">
                    로그아웃
                </BasicButton>
            </div>
            <div class="box-gnb-list">
                <div class="gnb-1dep-box">
                    <ul>
                        <li
                            v-for="(depth1, index) in gnbList"
                            :key="`gnb-depth1-${index}`"
                            :class="{ active: index === activeIndex }"
                        >
                            <button type="button" @click="onActive(index)">
                                {{ depth1.name }}
                            </button>
                        </li>
                    </ul>
                </div>
                <div class="gnb-2dep-box">
                    <div
                        v-for="(depth2, index) in gnbList"
                        :key="`gnb-depth2-${index}`"
                        :class="['gnb-2dep', { active: index === activeIndex }]"
                    >
                        <ul v-if="depth2.children">
                            <li
                                v-for="(child, childIndex) in depth2.children"
                                :key="`gnb-depth2-child-${childIndex}`"
                            >
                                <Anchor
                                    :href="`${
                                        depth2.path === '*' ? '' : depth2.path
                                    }${child.path}`"
                                >
                                    {{ child.name }}
                                </Anchor>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    </Page>
</template>

<script lang="ts">
import { Component, Mixins, Watch } from 'vue-property-decorator'
import PageView from '@utils/mixins/PageView'
import menu from '@asstes/static/dummy/menu.json'
import { AuthModule, LogoutInfo } from '@stores/modules/auth'
import type { GnbItem } from '@stores/modules/ui'

@Component
export default class NavigationPage extends Mixins(PageView) {
    /** @Stores */
    get userName() {
        return AuthModule.userName
    }

    get logoutInfo() {
        return AuthModule.logoutInfoData
    }

    /** @Data */

    /** 활성화 된 메뉴의 index */
    private activeIndex = -1

    /** 메뉴 리스트 */
    private gnbList: GnbItem[] = menu.gnbList

    /** @Computed */

    /** 로그아웃 완료 후 안내 팝업의 텍스트 */
    get modalMessage(): string {
        return this.logoutInfo ? this.logoutInfo.rsMsg : ''
    }

    /** @Watch */

    // path 변경 감지
    @Watch('$route.path')
    changeRoute() {
        this.onClose()
    }

    // 로그아웃 API의 결과 값 변경 감지
    @Watch('logoutInfo')
    changeLogoutInfo(value: LogoutInfo /* oldValue: LogoutInfo */) {
        if (value && value.rc) {
            this.$modal.open({
                buttonText: { confirm: '확인' },
                confirm: () => {
                    this.$router.push({ name: 'Login' })
                },
                message: this.modalMessage,
            })
        }
    }

    /** @Methods */

    onClose() {
        this.$router.back()
    }

    onActive(index: number) {
        this.activeIndex = index
    }

    async logout() {
        await this.$kakaoSdk.logout()
        await AuthModule.getLogoutInfo()
    }
}
</script>

<style scoped lang="scss" src="./Navigation.scss"></style>
