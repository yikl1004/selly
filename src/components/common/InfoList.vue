<template>
    <div class="box-info-wrap" :class="type">
        <div v-if="title" class="info-title">
            <h3 class="title">
                {{ title }}
            </h3>
        </div>
        <div class="box-info-list">
            <div v-for="(item, index) in list" :key="`list-${index}`" class="info-item">
                <div class="info-label">
                    <span>{{ item.title }}</span>
                </div>
                <div class="info-desc">
                    <span>{{ item.desc }}</span>
                </div>
            </div>
            <!--[D] case -->
            <!-- <div class="info-item">
                <div class="info-label">
                    <span>제목</span>
                </div>
                <div class="info-desc">
                    <span>일상환</span>
                    <span>정액 8,000만원</span>
                </div>
            </div>
            <div class="info-item">
                <div class="info-label">
                    <span>제목</span>
                </div>
                <div class="info-desc">
                    <span>
                        <BasicButton size="small">
                            신청
                        </BasicButton>
                    </span>
                </div>
            </div> -->
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

interface List {
    title: string
    desc: string
}

@Component
export default class InfoList extends Vue {
    /**
     * @category Props
     */
    @Prop({ type: Array })
    readonly list!: List[]

    @Prop({ type: String, default: '' })
    readonly type!: string

    //제목
    @Prop({ type: String })
    readonly title!: string
}
</script>

<style lang="scss" scoped src="./InfoList.scss"></style>
