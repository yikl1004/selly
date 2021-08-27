<template>
    <a
        v-if="href && (external || sameUri)"
        :href="href"
        :target="anchorTarget"
        data-a
    >
        <slot />
    </a>
    <router-link v-else :to="href" data-route-link>
        <slot />
    </router-link>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

const protocolRegExp = /https?/gi
/**
 * 링크 이동을 위한 컴포넌트
 * 1. protocol을 포함하면 외부링크로 인지 합니다.
 * 2. 같은 URI를 요청하는 경우 새로고침으로 간주 합니다.
 */
@Component
export default class Anchor extends Vue {
    /** 이동할 uri */
    @Prop({ type: [String, Object], default: '/', required: true })
    readonly href!: string | Location

    /** 외부 링크 인지 판단 */
    private external = protocolRegExp.test(this.href as string)

    @Watch('href')
    changeHref(value: string | object) {
        if (typeof value === 'string') {
            this.external = protocolRegExp.test(value)
        }
    }

    /** 같은 uri 인지 판단 */
    get sameUri(): boolean {
        return this.$route.path === this.href
    }

    /** a 태그의 target attribute 기능 */
    get anchorTarget(): '_blank' | '' {
        return this.external ? '_blank' : ''
    }
}
</script>

<style scoped></style>
