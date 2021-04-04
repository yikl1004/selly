<template>
    <button type="button" :class="classes" :style="style" @click="onClick">
        {{ label }}
    </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import './button.css'

export interface MyButtonProps {
    label: string
    primary?: boolean
    size?: 'small' | 'medium' | 'large'
    backgroundColor?: string
}

type Size = 'small' | 'medium' | 'large'

@Component
export default class MyButton extends Vue {
    @Prop({ type: String, required: true })
    readonly label!: string

    @Prop({ type: Boolean, default: false })
    readonly primary!: boolean

    @Prop({
        type: String,
        default: 'medium',
        validator: (value: Size) => {
            return ['small', 'medium', 'large'].indexOf(value) !== -1
        },
    })
    readonly size!: Size

    @Prop({ type: String })
    readonly backgroundColor!: string

    get classes() {
        return {
            'storybook-button': true,
            'storybook-button--primary': this.primary,
            'storybook-button--secondary': !this.primary,
            [`storybook-button--${this.size}`]: true,
        }
    }

    get style() {
        return {
            backgroundColor: this.backgroundColor,
        }
    }

    onClick(): void {
        /**
         * click event
         * @param { undefined }
         * @returns { void }
         */
        this.$emit('onClick')
    }
}
</script>
