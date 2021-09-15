<template>
    <div>{{ content }}</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
// import { TermsModule }

@Component
export default class Terms extends Vue {
    @Prop({ type: String, default: '', required: true })
    readonly prvSeq!: string

    /** 약관 내용 */
    private content = '불러오는 중입니다.'

    mounted() {
        // TODO: 약관 불러오기
        // await
    }
}
</script>

<style scoped></style>
