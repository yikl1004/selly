<template>
    <div class="container">
        <slot />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class PageBody extends Vue {}
</script>

<style scoped></style>
