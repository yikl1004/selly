<template>
    <div class="box-gray">
        <div v-for="(item, index) in list" :key="`item-list-${index}`" class="item">
            <span class="subject">{{ item.subject }}</span>
            <strong class="value">{{ item.value }}</strong>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

interface List {
    subject: string
    value: string
}

@Component
export default class BoxGray extends Vue {
    /**
     * @category Prop
     */
    @Prop({ type: Array, default: [] })
    readonly list!: List[]
}
</script>

<style scoped lang="scss" src="./BoxGray.scss"></style>
