<template>
    <header class="page-header">
        <h1 class="logo">
            <Link href="/">
                Selly
            </Link>
        </h1>
        <button type="button" class="global-navigation">
            <span class="ir">전체 메뉴</span>
        </button>
    </header>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'

@Component
export default class Header extends Vue {
    private toggle: boolean = false

    get classes(): string {
        return true ? 'aa' : 'bb'
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

<style lang="scss">
.layout-header {
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    .logo {
        color: #fff;
        margin: 0;
    }

    .global-navigation {
    }
}
</style>
