<template>
    <div class="popup-inner">
        <CardAuth type="cvc" />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import CardAuth from '@components/finance/CardAuth.vue'

@Component({
    components: {
        CardAuth,
    },
})
export default class PopupUseAgree extends Vue {}
</script>
