<template>
    <div class="container">
        <div class="content pd-btm">
            <div class="faq-wrap">
                <Tab :list="tabList" :active="0">
                    <template slot-scope="{ activeIndex }">
                        <div v-if="activeIndex === 0">
                            <FaqView />
                        </div>
                        <div v-if="activeIndex === 1">
                            <p>2</p>
                        </div>
                        <div v-if="activeIndex === 2">
                            <p>3</p>
                        </div>
                    </template>
                </Tab>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import FaqView from '@components/cs/FaqView.vue'

@Component({
    components: {
        FaqView,
    },
})
export default class FaqPage extends Vue {
    private tabList = [
        { name: '전체' },
        { name: '회원' },
        { name: '매출관리' },
        { name: '금융상품' },
        { name: '마케팅' },
    ]
}
</script>
