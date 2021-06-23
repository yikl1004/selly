<template>
    <div class="layout-default">
        <Header />
        <slot />
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class DefaultLayout extends Vue {
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
