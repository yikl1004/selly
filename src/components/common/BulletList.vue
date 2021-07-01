<template>
    <ul v-if="list" class="bullet-list">
        <li v-for="(item, index) in list" :key="`bullet-list-${index}`">
            {{ item.text }}
        </li>
    </ul>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

interface List {
    text: string
}

@Component
export default class BulletList extends Vue {
    /**
     * @category Prop
     */

    /** 안내텍스트 */
    @Prop({ type: String })
    readonly list!: List[]
}
</script>

<style lang="scss" scoped src="./BulletList.scss"></style>
