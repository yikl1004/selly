<template>
    <div id="layout">
        <Header />
        <main>
            <slot />
        </main>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({
    components: {},
})
export default class Layout extends Vue {}
</script>

<style lang="scss"></style>
