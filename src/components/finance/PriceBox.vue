<template>
    <div class="price-box">
        <strong class="price-title">{{ title }}</strong>
        <em class="price">
            <strong>{{ price }}</strong> 원
        </em>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class PriceBox extends Vue {
    /**
     * @category Prop
     */
    @Prop({ type: String })
    readonly title!: string

    @Prop({ type: String })
    readonly price!: string
}
</script>

<style lang="scss" scoped src="./PriceBox.scss"></style>
