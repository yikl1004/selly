<template>
    <transition enter-active-class="animate__animated animate__slideInRight" leave-active-class="animate__animated animate__slideOutRight">
        <section v-if="show" class="box-gnb-wrap">
            <div class="gnb-header">
                <h2>
                    <Anchor href="/main" class="logo">
                        <span class="ir">Selly</span>
                    </Anchor>
                </h2>
                <button type="button" class="btn-gnb-close" @click="onClose">
                    <span class="ir">메뉴 닫기</span>
                </button>
            </div>
            <div class="user-info">
                <strong class="user-name">김로카님</strong>
                <BasicButton type="textGray">
                    로그아웃
                </BasicButton>
            </div>
            <div class="box-gnb-list">
                <div class="gnb-1dep-box">
                    <ul>
                        <li v-for="(depth1, index) in gnbList" :key="`gnb-depth1-${index}`" :class="{ active: index === activeIndex }">
                            <button type="button" @click="onActive(index)">
                                {{ depth1.name }}
                            </button>
                        </li>
                    </ul>
                </div>
                <div class="gnb-2dep-box">
                    <div
                        v-for="(depth2, index) in gnbList"
                        :key="`gnb-depth2-${index}`"
                        :class="['gnb-2dep', { active: index === activeIndex }]"
                    >
                        <ul v-if="depth2.children">
                            <li v-for="(child, childIndex) in depth2.children" :key="`gnb-depth2-child-${childIndex}`">
                                <Anchor :href="child.path">
                                    {{ child.name }}
                                </Anchor>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    </transition>
</template>

<script lang="ts">
import { Component, Prop, PropSync, Vue, Watch } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

interface MenuItem {
    name: string
    path: string
}

const UiModule = namespace('ui')

@Component
export default class Gnb extends Vue {
    /**
     * @category Props
     */

    /** 노출 여부(초기 설정) */
    @Prop({ type: Boolean, default: false, required: true })
    public show!: boolean

    /**
     * @category Data
     */

    private menuList: MenuItem[] = [{ name: '매출', path: '' }]
    private activeIndex: number = 1

    @UiModule.State('gnbList')
    readonly gnbList!: GnbItem[]

    /**
     * @category Computed
     */

    get currentChildren(): GnbItem[] {
        return this.gnbList[this.activeIndex].children || ([] as GnbItem[])
    }

    /**
     * @category Watch
     */

    @Watch('$route.path')
    changeRoute(val: any, old: any) {
        this.onClose()
    }

    /**
     * @category Methods
     */

    onClose(event?: PointerEvent) {
        /**
         * click 이벤트
         */
        this.$emit('close', event)
    }

    onActive(index: number) {
        console.log(index)
        this.activeIndex = index
    }
}
</script>

<style scoped lang="scss" src="./Gnb.scss"></style>
