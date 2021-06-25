<template>
    <div class="layout-default">
        <Header header-type="sub" @click="openGnb" />
        <Gnb :show.sync="show" @click="closeGnb" />
        <slot />
        <Footer />
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class DefaultLayout extends Vue {
    private show: boolean = false
    openGnb() {
        this.show = true
    }

    closeGnb() {
        this.show = false
    }

    mounted() {
        console.log('DefaultLayout MOUNTED')
    }
}
</script>

<style lang="scss">
#layout {
    background-color: #fff;
}
</style>
