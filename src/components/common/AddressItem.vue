<template>
    <button class="address-item">
        <strong class="zip-code">03172 (110-821)</strong>
        <p class="road-name new">
            서울특별시 종로구 세종대로 175 (세종로)
        </p>
        <p class="road-name old">
            <Flag text="지번" color="white" />
            서울특별시 종로구 세종로 81-3
        </p>
    </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class AddressItem extends Vue {}
</script>

<style lang="scss" scoped src="./AddressItem.scss"></style>
