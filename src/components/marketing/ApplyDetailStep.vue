<template>
    <div class="apply-step-wrap">
        <ul>
            <li
                v-for="(item, index) in stepList"
                :key="`apply-detail-step-${index}`"
                :class="[`type0${index + 1}`, { active: active === index + 1 }]"
            >
                <i class="ico">
                    <span>{{ index + 1 }}</span>
                </i>
                <span>{{ item }}</span>
                <!--[D] 진행예정 케이스에만 노출-->
                <span v-if="dday" class="day">(D-3){{ dday }}</span>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class extends Vue {
    /** 현재 스텝 정보 - 몇번째 인지 */
    @Prop({ type: Number, required: true })
    readonly active!: number

    /** d-day 정보 */
    @Prop({ type: String })
    readonly dday!: string

    private stepList: string[] = ['접수완료', '준비중', '진행예정', '진행']
}
</script>

<style lang="scss" scoped src="./ApplyDetailStep.scss"></style>
