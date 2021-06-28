<template>
    <a v-if="external || sameUri" :href="href" :target="anchorTarget">
        <slot />
    </a>
    <router-link v-else :to="href">
        <slot />
    </router-link>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

const protocolRegExp = /https?/gi
/**
 * 링크 이동을 위한 컴포넌트
 * 1. protocol을 포함하면 외부링크로 인지 합니다.
 * 2. 같은 URI를 요청하는 경우 새로고침으로 간주 합니다.
 */
@Component
export default class Anchor extends Vue {
    @Prop({ type: String, default: '/', required: true })
    public href!: string

    get external(): boolean {
        return protocolRegExp.test(this.href)
    }

    get sameUri(): boolean {
        return this.$route.path === this.href
    }

    get anchorTarget(): '_blank' | '' {
        return this.external ? '_blank' : ''
    }
}
</script>

<style scoped></style>
