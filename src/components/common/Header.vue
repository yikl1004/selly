<template>
    <header class="layout-header">
        <MenuButton :opened="toggle" @toggle="onToggle" />
        <SideMenu :open="toggle" @close="onClose" />
        <h1>
            <Link href="/">
                Selly
            </Link>
        </h1>
    </header>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import MenuButton from '@components/common/MenuButton.vue'

@Component({
    components: {
        MenuButton,
        SideMenu: () => import('@components/common/SideMenu.vue'),
    },
})
export default class Header extends Vue {
    private toggle: boolean = true

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
    background-color: #000;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    h1 {
        color: #fff;
        margin: 0;
    }
}
</style>
