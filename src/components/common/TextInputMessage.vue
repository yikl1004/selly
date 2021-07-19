<template>
    <div :class="['box-text-message', messageType]">
        <i class="icon"></i>
        <p class="text-message">
            {{ message }}
        </p>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

export type MessageType = 'error' | 'success'

@Component
export default class TextInputMessage extends Vue {
    /**
     * @category Props
     */

    @Prop({ type: String, default: '' })
    readonly message!: string

    @Prop({ type: String })
    readonly messageType!: MessageType
}
</script>

<style lang="scss" scoped src="./TextInputMessage.scss"></style>
