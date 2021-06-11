<template>
    <transition
        name="bottom-sheet-dimm"
        mode="out-in"
        enter-active-class="animate__animated animate__fadeIn"
        leave-active-class="animate__animated animate__fadeOut"
    >
        <div v-if="show" class="dimm" @click="onClose" />
    </transition>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Dimmed extends Vue {
    /**
     * @category Props
     */

    /** 노출 여부 */
    @Prop({ type: Boolean, default: false, required: true })
    readonly show!: boolean

    /**
     * @category Methods
     */

    onClose() {
        /**
         * click 이벤트 방출
         * @event click
         */
        this.$emit('click')
    }
}
</script>

<style scoped lang="scss" src="./Dimmed.scss"></style>
