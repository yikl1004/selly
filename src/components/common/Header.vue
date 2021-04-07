<template>
    <header id="header">
        <h1>Header</h1>
    </header>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Header extends Vue {}
</script>

<style scoped lang="scss">
#header {
    height: 50px;
    background-color: #000;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
