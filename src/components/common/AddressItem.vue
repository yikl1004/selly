<template>
    <button class="address-item" @click="onSelect">
        <strong class="zip-code">{{ zipcode }}</strong>
        <p class="road-name new">
            {{ road }}
        </p>
        <p class="road-name old">
            <Flag text="지번" color="white" />
            {{ jibun }}
        </p>
    </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class AddressItem extends Vue {
    /** @Props */

    /** 지번 */
    @Prop({ type: String, default: '', required: true })
    readonly jibun!: string

    /** 도로명 */
    @Prop({ type: String, default: '', required: true })
    readonly road!: string

    /** 우편번호 */
    @Prop({ type: String, default: '', required: true })
    readonly zipcode!: string

    /** @Methods */

    onSelect() {
        /**
         * @event click
         * click 이벤트
         */
        this.$emit('select', {
            zipcode: this.zipcode,
            road: this.road,
        })
    }
}
</script>

<style lang="scss" scoped src="./AddressItem.scss"></style>
