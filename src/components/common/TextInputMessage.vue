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
    /** 메세지 내용 */
    @Prop({ type: String, default: '' })
    readonly message!: string

    /** 메세지 디자인 타입 */
    @Prop({ type: String })
    readonly messageType!: MessageType
}
</script>

<style lang="scss" scoped src="./TextInputMessage.scss"></style>
