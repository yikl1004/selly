<template>
    <div class="container">
        <!-- <scroll-container class="flex" @change="updateState">
            <div class="list">
                <scroll-item v-for="i in 200" :id="i" :key="i" @change="onChange">
                    <p :class="['bloc', getClass(i)]" :style="getStyle(i)">
                        {{ i }}
                    </p>
                </scroll-item>
            </div>
        </scroll-container> -->

        <!-- 도로명주소 API 확인용 -->
        <div class="dev-address">
            <input v-model="addressKeyword" type="text" />
            <BasicButton @click="onSearchAddress">
                주소 검색
            </BasicButton>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import axios from 'axios'

const { ScrollContainer, ScrollItem } = require('vue-scrollmonitor')

@Component({
    components: { ScrollContainer, ScrollItem },
})
export default class LoginPage extends Vue {
    private addressKeyword: string = '동대문'

    state: any[] = []

    get itemsInViewport() {
        return this._.pickBy(this.state, ({ isInViewport }) => isInViewport)
    }

    getClass(i: number): string {
        const state = this.state[i]
        if (state && (state.isFullyInViewport || state.isAboveViewport)) {
            return 'in'
        } else {
            return 'out'
        }
    }

    getStyle(i: number) {}

    updateState(state: any) {
        this.state = state
    }

    onChange(state: any) {
        console.log('change')
    }

    onSearchAddress() {
        // 기본 로직...
        if (this.addressKeyword) {
            axios.get('https://www.juso.go.kr/addrlink/addrLinkApi.do', {
                params: {
                    currentPage: '1',
                    countPerPage: '10',
                    keyword: this.addressKeyword,
                    resultType: 'json',
                    confmKey: 'U01TX0FVVEgyMDE2MDUyMzE1Mzg0ODEyNDk3',
                },
            })
        } else {
            alert('검색어를 입력해 주세요.')
        }
    }
}
</script>

<style scoped lang="scss">
.list {
    width: 100%;
    padding: 24px;
}
.bloc {
    background-color: #fff;
    width: 100%;
    height: 120px;
    border-radius: 8px;
    box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.2);
    transform: translateY(20%);
    opacity: 0;

    transition: all 300ms ease-in-out;

    &.isaboveviewport,
    &.isfullyinviewport {
        transform: translateY(0);
        opacity: 1;
    }
}

.bloc + .bloc {
    margin-top: 40px;
}
</style>
