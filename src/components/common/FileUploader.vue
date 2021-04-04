<template>
    <image-uploader
        accept="image/*"
        :max-width="300"
        :max-height="300"
        :quality="1"
        :preview="true"
        output-format="verbose"
        @input="setImage"
        @onUpload="startImageResize"
        @onComplete="endImageResize"
    />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class extends Vue {
    private startImageResize(a: Blob) {
        console.dir(a.size)
    }

    private setImage(a: any): void {
        console.log('setImage', a)
    }

    private endImageResize(a: any) {
        console.log('endImageResize', a)
    }
}
</script>

<style scoped></style>
