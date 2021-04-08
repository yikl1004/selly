<template>
    <transition name="side-menu">
        <div v-if="open" class="side-menu">
            dslkfjsdlfkjsdlkfjsdlfkj
            <button type="button" class="button-close" @click="onClose"></button>
        </div>
    </transition>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class SideMenu extends Vue {
    @Prop({ type: Boolean, default: false, required: true })
    readonly open!: boolean

    onClose() {
        this.$emit('close')
    }
}
</script>

<style lang="scss">
.side-menu {
    position: fixed;
    top: 0;
    left: 0;
    width: 70%;
    height: 100%;
    background: #fff;
    box-shadow: 4px 4px 10px 2px rgba(0, 0, 0, 0.2);
}

.button-close {
    position: absolute;
    right: 0;
    top: 0;
    width: 50px;
    height: 50px;
}

.side-menu-enter-active,
.side-menu-leave-active {
    left: 0;
    transition: left ease-in-out 0.5s;
}
.side-menu-enter, .side-menu-leave-to /* .fade-leave-active below version 2.1.8 */ {
    left: -100%;
}
</style>
