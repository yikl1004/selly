<template>
    <div class="popup-inner">
        <PriceBox title="상환원금" price="1,000,000" />

        <Tab :list="tabList" :active="0" type="solid">
            <template slot-scope="{ activeIndex }">
                <div v-if="activeIndex === 0" class="tab-cont">
                    <RepaymentBox type="all" />
                </div>
                <div v-if="activeIndex === 1" class="tab-cont">
                    <RepaymentBox />
                </div>
            </template>
        </Tab>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import PriceBox from '@components/finance/PriceBox.vue'
import RepaymentBox from '@components/finance/RepaymentBox.vue'

@Component({
    components: { PriceBox, RepaymentBox },
})
export default class PopupPrepayment extends Vue {
    private tabList = [{ name: '전체상환' }, { name: '부분상환' }]
}
</script>

<style lang="scss" scoped src="./PopupPrepayment.scss"></style>
