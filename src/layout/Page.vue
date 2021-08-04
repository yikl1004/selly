<template>
    <div class="layout-default">
        <slot />
        <Footer v-if="useFooter" />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Page extends Vue {
    /** footer 사용/노출 여부 */
    get useFooter(): boolean {
        return this.$route.meta.footer !== false
    }
}
</script>

<style scoped></style>
