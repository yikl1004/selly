<template>
    <div>
        <h1>예제 페이지</h1>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class extends Vue {
    /**
     * @category METHODS
     * @title Custom
     */
    validate(value: string): boolean {
        return this._.toNumber(value) < 3500
    }
}
</script>

<style scoped></style>
