<template>
    <fragment>
        <router-link v-if="!external" :to="href">
            <slot />
        </router-link>
        <a v-else-if="external" :href="href">
            <slot />
        </a>
    </fragment>
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
