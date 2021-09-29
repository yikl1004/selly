<template>
    <div class="site-wrapper">
        <Loading v-if="isLoading" />
        <router-view />
        <PortalTarget name="bottomSheet" multiple />
        <PortalTarget name="modal" multiple />
        <Modal
            v-if="modalProps.message"
            :show.sync="modalProps.show"
            :button-text="modalProps.buttonText"
            type="popup"
            @confirm="onConfirmModal"
            @cancel="onCancelModal"
        >
            {{ modalProps.message }}
        </Modal>
        <Modal
            v-if="isSessionExtendModal"
            :show.sync="isSessionExtendModal"
            :button-text="{ confirm: '연장', cancel: '취소' }"
            type="popup"
            @confirm="onConfirmSessionModal"
            @cancel="onCancelSessionModal"
        >
            안전한 거래를 위해
            <br />
            60초 이후 자동로그아웃 됩니다.
        </Modal>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { UiModule } from '@stores/modules/ui'
import type { ModalOptions } from '@utils/plugins/modal'
import { CommonModule } from '@stores/modules/common'
import { sessionTimer } from '@router/navigationGuard'
import { Path } from '@router/routes'

@Component
export default class App extends Vue {
    /** 모달 노출시 컴포넌트에 들어갈 default props */
    private modalProps: ModalOptions & { show: boolean } = {
        message: '',
        show: false,
        buttonText: { confirm: '확인' },
        confirm: () => console.log('confirm 함수를 넣어 주세요'),
    }

    /** 자동로그아웃 시간 초과 여부 */
    get overtimeData() {
        return CommonModule.overtimeData
    }

    @Watch('overtimeData')
    changeOvertimeData(value: boolean) {
        if (value) {
            this.$router.replace(Path.Login)
        }
    }

    /** 자동 로그아웃 모달 노출 여부 */
    get isSessionExtendModal() {
        return CommonModule.isSessionExtendModal
    }
    set isSessionExtendModal(value: boolean) {
        CommonModule.setSessionModal(value)
    }

    /** 로딩 여부 */
    get isLoading(): boolean {
        return UiModule.loadingData
    }

    async onConfirmSessionModal() {
        await CommonModule.getLoginExtendInfo()
        sessionTimer.clear()
        sessionTimer.create()
    }
    onCancelSessionModal() {
        console.log('세션 모달 취소 버튼 클릭')
    }

    /** alert or confirm 모달 확인 버튼 클릭 시 */
    onConfirmModal() {
        console.log('모달 확인 버튼 누를때 실행되는 액션')
        typeof this.modalProps.confirm === 'function' &&
            this.modalProps.confirm()
    }

    /** confirm 모달 취소 버튼 클릭 시 */
    onCancelModal() {
        console.log('모달 취소 버튼 누를때 실행되는 액션')
        typeof this.modalProps.cancel === 'function' && this.modalProps.cancel()
    }

    /** 모달 노출 및 props 세팅 */
    setModalContainer() {
        this.$modal.bus.$on('open', (options: ModalOptions | string) => {
            let mergeOption = { ...this.modalProps, show: true }

            if (typeof options === 'string') {
                mergeOption.message = options
            } else {
                mergeOption = {
                    ...mergeOption,
                    ...options,
                }
            }

            this.modalProps = mergeOption
        })
    }

    mounted() {
        this.setModalContainer()
    }
}
</script>

<style lang="scss">
.site-wrapper {
    min-height: 100vh;
}
</style>
