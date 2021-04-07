<template>
    <div>
        <h1>메인</h1>
        <TextField id="test-field" label="입력" @onChange="onChange" />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Main extends Vue {
    onChange(value: string) {
        console.log('input', value)
    }
}
</script>

<style scoped></style>
