<template>
    <div class="price-box">
        <div class="title-area">
            <strong v-if="title" class="price-title">{{ title }}</strong>
            <p v-if="date" class="date">
                {{ date }}
            </p>
        </div>
        <em v-if="price" class="price">
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

    @Prop({ type: String })
    readonly date!: string
}
</script>

<style lang="scss" scoped src="./PriceBox.scss"></style>
