<template>
    <div id="layout">
        <Header />
        <div class="container">
            <slot />
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class DefaultLayout extends Vue {}
</script>

<style lang="scss">
#layout {
    background-color: #fff;
}
</style>
