<template>
    <div :class="['box-text-message', messageType]">
        <i class="icon"></i>
        <p class="text-message">
            에러 / 성공메시지
            <!-- {{ message }} -->
        </p>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class TextInputMessage extends Vue {
    /**
     * @category Props
     */

    @Prop({ type: String, default: '' })
    readonly errorMessage!: string

    @Prop({ type: String, default: '' })
    readonly successMessage!: string

    @Prop({ type: String })
    readonly messageType!: string
}
</script>

<style lang="scss" scoped src="./TextInputMessage.scss"></style>
