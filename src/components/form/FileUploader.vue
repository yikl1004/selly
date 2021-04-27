<template>
    <div class="file-uploader">
        <image-uploader
            :id="inputId"
            accept="image/*"
            :max-width="300"
            :max-height="300"
            :quality="1"
            :preview="false"
            output-format="blob"
            @input="onChanged"
            @onUpload="onUpload"
            @onComplete="onComplete"
        >
            <label slot="upload-label" :for="id">
                <img v-if="blobUrl" :src="blobUrl" alt="image" />
                <p>용량({{ fileInfo.unit }}): {{ fileInfo.size }}{{ fileInfo.unit }}</p>
            </label>
        </image-uploader>
    </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator'

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
    /** form 요소에 사용될 id */
    @Prop({ type: String, default: 'file-input', required: true })
    readonly id!: string

    /** 용량 제한(단위: Byte, 1024) */
    @Prop({ type: Number, default: 1024 })
    readonly limitSize!: number

    private blobUrl: string = ''
    private fileInfo: { size: number; unit: 'MB' | 'KB' } = { size: 0, unit: 'KB' }
    private file!: Blob

    get inputId(): string {
        return this.id
    }

    onUpload() {}

    onChanged(file: Blob): void {
        this.file = file

        const convertedFile = file as Blob
        const url = URL.createObjectURL(convertedFile)
        const result = convertedFile.size / 1024

        let unit: 'KB' | 'MB'
        let size: number

        if (result < 1024) {
            unit = 'KB'
            size = this._.toNumber(result.toFixed()) * 1
        } else {
            unit = 'MB'
            size = this._.toNumber((result / 1024).toFixed(2))
        }

        this.blobUrl = url
        this.fileInfo = { size, unit }

        this.checkSize()

        /**
         * 이미지로드 완료 callback
         * @event onChanged
         * @type {Blob}
         */
        this.$emit('onChanged', this.file)
    }

    onComplete() {}

    checkSize() {
        const limitSize = this.limitSize
        if (this.limitSize) {
        }
    }
}
</script>

<style scoped></style>
