<template>
    <div class="file-uploader">
        <image-uploader
            accept="image/*"
            :max-width="300"
            :max-height="300"
            :quality="1"
            :preview="false"
            output-format="blob"
            @input="setImage"
            @onUpload="startImageResize"
            @onComplete="endImageResize"
        >
            <label :for="id"></label>
            <img v-if="blobUrl" :src="blobUrl" alt="image" />
            <p>용량({{ fileInfo.unit }}): {{ fileInfo.size }}{{ fileInfo.unit }}</p>
        </image-uploader>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import _ from 'lodash'

declare global {
    interface ImageUploaderVervoseFile {
        dataUrl: string
        exif: null | string
        info: {
            aspectRatio: number
            modifiedDate: Date
            name: string
            newHeight: number
            newWidth: number
            orgHeight: number
            orgWidth: number
            type: string
        }
    }
}

@Component
export default class FileUploader extends Vue {
    @Prop({ type: String, default: 'file-input', required: true })
    readonly id!: string

    private blobUrl: string = ''
    private fileInfo: { size: number; unit: 'MB' | 'KB' } = { size: 0, unit: 'KB' }

    public startImageResize() {
        /**
         * 이미지 리사이즈를 실행 callback
         */
    }

    public setImage(file: Blob | ImageUploaderVervoseFile): void {
        /**
         * Blob 객체를 매개변수로 받는 callback
         * @description Blob.size는 바이트 단위의 number
         */
        const convertedFile = file as Blob
        const url = URL.createObjectURL(convertedFile)
        const result = convertedFile.size / 1024 / 1024
        const unit: 'KB' | 'MB' = result < 1 ? 'KB' : 'MB'
        const size: number = _.toNumber((result < 1 ? result : result / 1024).toString(2))

        this.blobUrl = url
        this.fileInfo = { size, unit }
    }

    public endImageResize() {
        /**
         * 이미지 리사이즈 종료 callcack
         */
    }
}
</script>

<style scoped></style>
