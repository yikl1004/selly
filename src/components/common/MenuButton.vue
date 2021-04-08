<template>
    <button type="button" class="menu-button" @click="onClick">
        <span class="ir">전체메뉴</span>
        <i />
    </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class MenuButton extends Vue {
    @Prop({ type: Boolean, default: false, required: true })
    readonly opened!: boolean

    onClick() {
        this.$emit('toggle')
    }
}
</script>

<style scoped lang="scss">
$width: 24px;
$height: 1px;
$term: 8px;

@mixin shape {
    width: $width;
    height: $height;
    background-color: #fff;
    display: block;
    position: absolute;
}

.menu-button {
    width: 50px;
    height: 50px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 99;
    padding: 10px;

    i {
        @include shape;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);

        &:after,
        &:before {
            content: '';
            @include shape;
        }

        &:after {
            bottom: -$term;
        }

        &:before {
            top: -$term;
        }
    }
}
</style>
