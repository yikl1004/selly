<template>
    <div class="popup-inner">핸드폰 약관 내용</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AgreeStepBox from '@components/finance/AgreeStepBox.vue'
// import type { RadioProps } from '@components/form/Radio.vue'

@Component({
    components: {
        AgreeStepBox,
    },
})
export default class PopupAgreePhone extends Vue {}
</script>
<style scoped lang="scss"></style>
