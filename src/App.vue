<template>
    <Layout />
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Layout from '@layout/Layout.vue'

@Component({
    components: { Layout },
})
export default class App extends Vue {}
</script>

<style lang="scss"></style>
