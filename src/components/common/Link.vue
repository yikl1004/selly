<template>
    <a v-if="external" :href="href">
        <slot />
    </a>
    <router-link v-else :to="href">
        <slot />
    </router-link>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class SellyLink extends Vue {
    @Prop({ type: String, default: '/', required: true })
    public href!: string

    @Prop({ type: Boolean, default: false })
    public external!: boolean
}
</script>

<style scoped></style>
