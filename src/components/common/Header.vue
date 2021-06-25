<template>
    <header class="page-header" :class="{ 'proccess-type': isProcess }">
        <ProgressBar v-if="isProcess" :progress-number="20" />
        <div class="header-inner">
            <!-- 로고 -->
            <h1 v-if="isMain" class="header-logo">
                <Anchor href="/" class="logo">
                    <span class="ir">Selly</span>
                </Anchor>
            </h1>

            <!-- 이전버튼 -->
            <button v-if="isSub" type="button" class="btn-prev-page">
                <span class="ir">이전</span>
            </button>

            <!-- 페이지 타이틀 -->
            <div v-if="!isMain" class="page-title">
                <strong>페이지이름</strong>
            </div>

            <!-- 프로세스 취소버튼 -->
            <button v-if="isProcess" type="button" class="btn-proccess-cancel">
                <span>취소</span>
            </button>

            <!-- 전체메뉴 -->
            <button v-if="!isProcess" type="button" class="global-navigation" @click="onOpenGNB">
                <span class="ir">전체 메뉴</span>
            </button>
        </div>
    </header>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

const UiModule = namespace('ui')

type HeaderType = 'main' | 'sub' | 'proccess'

@Component
export default class Header extends Vue {
    get classes(): string {
        return true ? 'aa' : 'bb'
    }
    /**
     * @category Props
     */

    /** 헤더타입 : main / sub / proccess*/
    @Prop({ type: String, default: 'sub' })
    readonly headerType!: HeaderType

    /** gnb 노출 여부 */
    @Prop({ type: Boolean, default: false })
    readonly gnbOpen!: boolean

    /**
     * @category Computed
     */

    get isProcess(): boolean {
        return this.headerType === 'proccess'
    }

    get isMain(): boolean {
        return this.headerType === 'main'
    }

    get isSub(): boolean {
        return this.headerType === 'sub'
    }

    /**
     * @category Data
     */
    private toggle: boolean = false

    /**
     * @category Methods
     */
    onClick(event: PointerEvent) {
        /**
         * click 이벤트
         */
        this.$emit('click', event)
    }

    @UiModule.Mutation('setGnb')
    readonly setGnb!: Function

    @UiModule.Action('getGnbList')
    readonly getGnbList!: Function

    onOpenGNB() {
        this.setGnb(true)
    }

    @Watch('$route')
    changeRoute() {
        this.toggle = false
    }

    onToggle() {
        this.toggle = !this.toggle
    }

    onClose() {
        this.toggle = false
    }

    mounted() {
        this.getGnbList()
    }
}
</script>

<style scoped lang="scss" src="./Header.scss"></style>
