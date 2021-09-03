<template>
    <header :class="['page-header', { 'proccess-type': isProcess }, type]">
        <div class="header-inner">
            <!-- 로고 -->
            <h1 v-if="isMain" class="header-logo">
                <Anchor href="/" class="logo">
                    <span class="ir">Selly</span>
                </Anchor>
            </h1>

            <!-- 이전버튼 -->
            <button
                v-if="isSub"
                type="button"
                class="btn-prev-page"
                @click="backPressed"
            >
                <span class="ir">이전</span>
            </button>

            <!-- 페이지 타이틀 -->
            <div v-if="!isMain || isTitle" class="page-title">
                <strong>{{ title }}</strong>
            </div>

            <!-- 프로세스 취소버튼 -->
            <button
                v-if="isProcess"
                type="button"
                class="btn-proccess-cancel"
                @click="onCancel"
            >
                <span>취소</span>
            </button>

            <!-- 전체메뉴 -->
            <button
                v-if="!isProcess && !isTitle"
                type="button"
                class="global-navigation"
                @click="onOpenGNB"
            >
                <span class="ir">전체 메뉴</span>
            </button>
        </div>
    </header>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

type HeaderType = 'main' | 'sub' | 'proccess' | 'title'

@Component
export default class Header extends Vue {
    /** 헤더타입 : main, sub, proccess */
    @Prop({ type: String, default: 'sub' })
    readonly type!: HeaderType

    /** 타이틀 */
    @Prop({ type: String, default: '' })
    readonly title!: string

    /**
     * @category Computed
     */

    get isProcess(): boolean {
        return this.type === 'proccess'
    }

    get isMain(): boolean {
        return this.type === 'main'
    }

    get isSub(): boolean {
        return this.type === 'sub'
    }

    get isTitle(): boolean {
        return this.type === 'title'
    }

    /**
     * @category Data
     */
    private toggle = false

    /**
     * @category Methods
     */
    onClick(event: PointerEvent) {
        /**
         * click 이벤트
         */
        this.$emit('click', event)
    }

    @Watch('$route')
    changeRoute() {
        this.toggle = false
    }

    onOpenGNB() {
        this.$router.push({ name: 'Navigation' })
    }

    backPressed() {
        this.$router.back()
    }

    onToggle() {
        this.toggle = !this.toggle
    }

    onClose() {
        this.toggle = false
    }

    /** 신청 프로세스 중 취소 */
    onCancel() {
        this.$modal.open({
            message: `${this.$route.meta?.title || ''} 신청을 취소합니다.`,
            buttonText: {
                confirm: '확인',
                cancel: '취소',
            },
            confirm: () => {
                this.$router.push({ name: 'Main' })
            },
        })
    }
}
</script>

<style scoped lang="scss" src="./Header.scss"></style>
