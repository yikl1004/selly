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
        >
            {{ modalProps.message }}
        </Modal>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { UiModule } from '@stores/modules/ui'
import type { ModalOptions } from '@utils/plugins/modal'

@Component
export default class App extends Vue {
    /** @Data */

    /** 모달 노출시 컴포넌트에 들어갈 default props */
    private modalProps: ModalOptions & { show: boolean } = {
        message: '',
        show: false,
        buttonText: { confirm: '확인' },
        confirm: () => console.log('confirm 함수를 넣어 주세요'),
    }

    /** @Computed */

    /** 로딩 여부 */
    get isLoading(): boolean {
        return UiModule.loadingData
    }

    onConfirmModal() {
        console.log('모달 확인 버튼 누를때 실행되는 액션')
        typeof this.modalProps.confirm === 'function' &&
            this.modalProps.confirm()
    }

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

    /** @Lifecycle */

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
