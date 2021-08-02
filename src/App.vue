<template>
    <div class="site-wrapper">
        <Layout />
        <PortalTarget name="bottomSheet" multiple />
        <PortalTarget name="modal" />
        <Loading v-if="isLoading" />
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
import Layout from '@layout/Layout.vue'
import type { ModalOptions } from '@utils/plugins/modal'

@Component({
    components: { Layout },
})
export default class App extends Vue {
    private modalProps: ModalOptions & { show: boolean } = {
        message: '',
        show: false,
        buttonText: { confirm: '확인' },
        confirm: () => console.log('confirm 함수를 넣어 주세요'),
    }

    get isLoading(): boolean {
        return this.$store.state.ui.loading
    }

    onConfirmModal() {
        console.log('모달 확인 버튼 누를 때 실행되는 액션')
        typeof this.modalProps.confirm === 'function' && this.modalProps.confirm()
    }

    mounted() {
        this.$modal.bus.$on('open', (options: ModalOptions) => {
            console.log(11111, options)
            this.modalProps = {
                ...this.modalProps,
                ...options,
                show: true,
            }
        })
    }
}
</script>

<style lang="scss">
.site-wrapper {
    min-height: 100vh;
}
</style>
