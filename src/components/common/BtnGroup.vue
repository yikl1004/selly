<template>
    <div class="btn-group">
        <slot />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class BtnGroup extends Vue {}
</script>

<style lang="scss" scoped src="./BtnGroup.scss"></style>
