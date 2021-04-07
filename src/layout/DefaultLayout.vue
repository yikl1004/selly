<template>
    <div id="layout">
        <main>
            <slot />
        </main>
        <footer>footer</footer>
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
