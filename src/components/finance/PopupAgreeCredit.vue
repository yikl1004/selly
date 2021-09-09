<template>
    <div class="popup-inner">
        <AgreeStepBox :isAll="true" />
        <div class="popup-agree-wrap">개인정보 필수적동의 내용</div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AgreeStepBox from '@components/finance/AgreeStepBox.vue'

@Component({
    components: {
        AgreeStepBox,
    },
})
export default class PopupAgreeCredit extends Vue {}
</script>
