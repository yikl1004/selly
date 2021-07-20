<template>
    <div class="loading-wrapper">
        <Dimmed show />
        <div class="loading">
            <i v-for="(item, index) in 4" :key="`loading-item-${index}`" />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Loading extends Vue {}
</script>

<style scoped lang="scss">
.loading-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
}
.loading {
    position: relative;
    z-index: 2000;
    width: 40px;
    height: 40px;
    transform: rotate(45deg);
    animation: loading5-ani1 3s ease-in-out infinite;

    i {
        width: 40px;
        height: 40px;
        display: inline-block;
        border-radius: 50%;
        position: absolute;

        &:nth-child(1) {
            background: #ff5954;
            transform: translate(0, 50px);
            animation: loading5-ani2 3s ease-in-out infinite;
        }

        &:nth-child(2) {
            background: #1f4c59;
            transform: rotate(90deg) translate(0, 50px);
            animation: loading5-ani3 3s ease-in-out infinite;
        }

        &:nth-child(3) {
            background: #00b39f;
            transform: rotate(180deg) translate(0, 50px);
            animation: loading5-ani4 3s ease-in-out infinite;
        }

        &:nth-child(4) {
            background: #ffb364;
            transform: rotate(270deg) translate(0, 50px);
            animation: loading5-ani5 3s ease-in-out infinite;
        }
    }
}
@keyframes loading5-ani1 {
    25% {
        transform: rotate(135deg);
    }
    50% {
        transform: rotate(225deg);
    }
    75% {
        transform: rotate(315deg);
    }
    100% {
        transform: rotate(405deg);
    }
}
@keyframes loading5-ani2 {
    17.5%,
    25%,
    42.5%,
    50%,
    67.5%,
    75%,
    92.5%,
    100% {
        transform: translate(0, 50px);
    }
    12.5%,
    37.5%,
    62.5%,
    87.5% {
        transform: translate(0, 35px);
    }
}
@keyframes loading5-ani3 {
    17.5%,
    25%,
    42.5%,
    50%,
    67.5%,
    75%,
    92.5%,
    100% {
        transform: rotate(90deg) translate(0, 50px);
    }
    12.5%,
    37.5%,
    62.5%,
    87.5% {
        transform: rotate(90deg) translate(0, 35px);
    }
}
@keyframes loading5-ani4 {
    17.5%,
    25%,
    42.5%,
    50%,
    67.5%,
    75%,
    92.5%,
    100% {
        transform: rotate(180deg) translate(0, 50px);
    }
    12.5%,
    37.5%,
    62.5%,
    87.5% {
        transform: rotate(180deg) translate(0, 35px);
    }
}
@keyframes loading5-ani5 {
    17.5%,
    25%,
    42.5%,
    50%,
    67.5%,
    75%,
    92.5%,
    100% {
        transform: rotate(270deg) translate(0, 50px);
    }
    12.5%,
    37.5%,
    62.5%,
    87.5% {
        transform: rotate(270deg) translate(0, 35px);
    }
}
</style>
