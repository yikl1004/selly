<template>
    <div class="bullet-list">
        <strong v-if="title" class="bullet-title">{{ title }}</strong>
        <ul v-if="list">
            <li
                v-for="(item, index) in list"
                :key="`bullet-list-${index}`"
                v-html="item.text"
            ></li>
        </ul>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

interface List {
    text: string
}

@Component
export default class BulletList extends Vue {
    /** 제목 */
    @Prop({ type: String })
    readonly title!: string
    /** 안내텍스트 */
    @Prop({ type: Array, default: [] })
    readonly list!: List[]
}
</script>

<style lang="scss" src="./BulletList.scss"></style>
