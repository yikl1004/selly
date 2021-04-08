<template>
    <header class="layout-header">
        <MenuButton :opened="toggle" @toggle="onToggle" />
        <SideMenu :open="toggle" @close="onClose" />
        <h1>Selly</h1>
    </header>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import MenuButton from '@components/common/MenuButton.vue'
import SideMenu from '@components/common/SideMenu.vue'

@Component({
    components: { MenuButton, SideMenu },
})
export default class Header extends Vue {
    private toggle: boolean = false

    onToggle() {
        this.toggle = !this.toggle
    }

    onClose() {
        this.toggle = false
    }
}
</script>

<style lang="scss" scoped>
.layout-header {
    height: 50px;
    background-color: #000;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
}
</style>
