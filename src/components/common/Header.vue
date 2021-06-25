<template>
    <header class="page-header" :class="{ 'proccess-type': headerType === 'proccess' }">
        <ProgressBar v-if="headerType === 'proccess'" :progress-number="20" />
        <div class="header-inner">
            <!-- 로고 -->
            <h1 v-if="headerType === 'main'" class="header-logo">
                <Anchor href="/" class="logo">
                    <span class="ir">Selly</span>
                </Anchor>
            </h1>

            <!-- 이전버튼 -->
            <button v-if="headerType === 'sub'" type="button" class="btn-prev-page">
                <span class="ir">이전</span>
            </button>

            <!-- 페이지 타이틀 -->
            <div v-if="headerType !== 'main'" class="page-title">
                <strong>페이지이름</strong>
            </div>

            <!-- 프로세스 취소버튼 -->
            <button v-if="headerType === 'proccess'" type="button" class="btn-proccess-cancel">
                <span>취소</span>
            </button>

            <!-- 전체메뉴 -->
            <button v-if="headerType !== 'proccess'" type="button" class="global-navigation" @click="onClick">
                <span class="ir">전체 메뉴</span>
            </button>
        </div>
    </header>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

@Component
export default class Header extends Vue {
    private toggle: boolean = false

    get classes(): string {
        return true ? 'aa' : 'bb'
    }
    /**
     * @category Props
     */
    /** 헤더타입 : main / sub / proccess*/
    @Prop({ type: String, default: 'sub' })
    readonly headerType!: string

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

    onToggle() {
        this.toggle = !this.toggle
    }

    onClose() {
        this.toggle = false
    }
}
</script>

<style scoped lang="scss" src="./Header.scss"></style>
