<template>
    <transition enter-active-class="animate__animated animate__slideInRight" leave-active-class="animate__animated animate__slideOutRight">
        <section v-if="show" class="box-gnb-wrap">
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
                <strong class="user-name">{{ bizmanName }}님</strong>
                <BasicButton type="textGray" @click="logout">
                    로그아웃
                </BasicButton>
            </div>
            <div class="box-gnb-list">
                <div class="gnb-1dep-box">
                    <ul>
                        <li v-for="(depth1, index) in gnbList" :key="`gnb-depth1-${index}`" :class="{ active: index === activeIndex }">
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
                            <li v-for="(child, childIndex) in depth2.children" :key="`gnb-depth2-child-${childIndex}`">
                                <Anchor :href="`${parentPath}${child.path}`">
                                    {{ child.name }}
                                </Anchor>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <Modal v-if="modalMessage" :show.sync="modalShow" :button-text="{ confirm: '확인' }" type="popup" @confirm="onConfirmModal">
                {{ modalMessage }}
            </Modal>
        </section>
    </transition>
</template>

<script lang="ts">
import { Component, Mixins, Prop, PropSync, Vue, Watch } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { KakaoSDK } from '@utils/mixins'

interface MenuItem {
    name: string
    path: string
}

const UiModule = namespace('ui')
const AuthModule = namespace('auth')

@Component
export default class Gnb extends Mixins(KakaoSDK) {
    /** @category Stores */
    @UiModule.State('gnbList') readonly gnbList!: GnbItem[]
    @AuthModule.Getter('bizmanName') readonly bizmanName!: string
    @AuthModule.State('logoutInfo') readonly logoutInfo!: LogoutInfo
    @AuthModule.Action('getLogoutInfo') readonly getLogoutInfo!: Function

    /** @category Props */

    /** 노출 여부(초기 설정) */
    @Prop({ type: Boolean, default: false, required: true })
    public show!: boolean

    /** @category Data */

    /** 메뉴 목록 */
    private menuList: MenuItem[] = [{ name: '매출', path: '' }]

    /** 활성화 된 메뉴의 index */
    private activeIndex: number = 1

    /** 모달 노출 */
    private modalShow: boolean = false

    /** @category Computed */

    /** 현재 활성화된 리스트 아이템 중 children을 반환 */
    get currentChildren(): GnbItem[] {
        return this.gnbList[this.activeIndex].children || ([] as GnbItem[])
    }

    /** 로그아웃 완료 후 안내 팝업의 텍스트 */
    get modalMessage(): string {
        return this.logoutInfo ? this.logoutInfo.rsMsg : ''
    }

    /** 현재 선택된 최상위 메뉴의 path 프로퍼티 */
    get parentPath(): string {
        const pathOfActiveMenu = this.gnbList[this.activeIndex].path
        return pathOfActiveMenu === '*' ? '' : pathOfActiveMenu
    }

    /** @category Watch */

    // path 변경 감지
    @Watch('$route.path')
    changeRoute() {
        this.onClose()
    }

    // 로그아웃 API의 결과 값 변경 감지
    @Watch('logoutInfo')
    changeLogoutInfo(value: LogoutInfo, oldValue: LogoutInfo) {
        if (value && value.rc) {
            this.modalShow = true
        }
    }

    /** @category Methods */

    onConfirmModal() {
        this.modalShow = false
        window.location.href = '/'
    }

    onClose(event?: PointerEvent) {
        /**
         * click 이벤트
         */
        this.$emit('close', event)
    }

    onActive(index: number) {
        this.activeIndex = index
    }

    async logout() {
        await this.kakaoLogout()
        await this.getLogoutInfo()
    }
}
</script>

<style scoped lang="scss" src="./Gnb.scss"></style>
