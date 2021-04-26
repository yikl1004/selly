<template>
    <transition name="side-menu">
        <div v-if="open" class="side-menu">
            <h1 class="title">
                메뉴
            </h1>
            <div class="list">
                <a-menu style="width: 256px" :open-keys.sync="openKeys" mode="inline" @click="handleClick">
                    <a-sub-menu v-for="(listItem, index) in list" :key="`main${index}`" @titleClick="titleClick">
                        <span slot="title">
                            <a-icon type="mail" />
                            <span>{{ listItem.text }}</span>
                        </span>
                        <template v-if="listItem.children && !!listItem.children.length">
                            <a-menu-item v-for="(child, childIndex) in listItem.children" :key="`sub-${index}-${childIndex}`">
                                <Link v-if="child.href" :href="child.href">
                                    {{ child.text }}
                                </Link>
                            </a-menu-item>
                        </template>
                    </a-sub-menu>
                </a-menu>
            </div>
            <button type="button" class="button-close" @click="onClose">
                <span class="ir">닫기</span>
            </button>
        </div>
    </transition>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

interface ListItem {
    text: string
    href?: string
    children?: ListItem[]
}

@Component
export default class SideMenu extends Vue {
    private current: string[] = ['mail']
    private openKeys: string[] = ['sub1']
    private list: ListItem[] = [
        {
            text: '매출현황',
            children: [
                {
                    text: '매출/입금 조회',
                    href: '/sales',
                },
            ],
        },
        {
            text: '마케팅',
            children: [
                {
                    text: '상권분석 리포트',
                    href: '/marketing/commercial-report',
                },
                {
                    text: '마케팅 설계 안내',
                    href: '/',
                },
                {
                    text: '마케팅(청구할인 등) 설계',
                    href: '/',
                },
                {
                    text: '실행내역 조회',
                    href: '/',
                },
            ],
        },
        {
            text: '대출',
            children: [
                {
                    text: '카드론(당사회원)',
                    href: '/',
                },
                {
                    text: '신용대출(비회원/준회원)',
                    href: '/',
                },
                {
                    text: '상환내역조회',
                    href: '/',
                },
            ],
        },
        {
            text: '신용카드',
            children: [
                {
                    text: '로카머니biz 신청',
                    href: '/',
                },
                {
                    text: '로카코인 적립 안내 및 상환',
                    href: '/',
                },
            ],
        },
        {
            text: '사업자 서비스',
            children: [
                {
                    text: '제휴사 서비스 노출',
                    href: '/',
                },
            ],
        },
        {
            text: '기타(관리)',
            children: [
                {
                    text: '사업자정보',
                    href: '/',
                },
                {
                    text: '이용약관',
                    href: '/',
                },
                {
                    text: '공지사항',
                    href: '/',
                },
                {
                    text: 'FAQ',
                    href: '/',
                },
            ],
        },
    ]

    @Prop({ type: Boolean, default: false, required: true })
    readonly open!: boolean

    onClose() {
        this.$emit('close')
    }

    handleClick(e: PointerEvent) {
        console.log('click', e)
    }

    titleClick(e: PointerEvent) {
        console.log('titleClick', e)
    }
}
</script>

<style lang="scss">
.side-menu {
    position: fixed;
    z-index: 3000;
    top: 0;
    left: 0;
    width: 70%;
    height: 100%;
    background: #fff;
    box-shadow: 4px 4px 10px 2px rgba(0, 0, 0, 0.2);
    color: #000;

    .title {
        padding: 10px;
    }

    .list {
        margin-top: 20px;

        .menu-item {
            height: 100%;
            width: 100%;
            display: block;
            box-sizing: border-box;
        }

        .depth1 {
            > li {
                position: relative;
                height: 60px;
                border-bottom: 1px solid #000;

                &:first-child {
                    border-top: 1px solid #000;
                }

                > .menu-item {
                    padding: 15px 20px;
                    font-size: 20px;
                    text-align: left;
                }

                &:after {
                    content: '';
                    display: block;
                    width: 14px;
                    height: 14px;
                    border-left: 1px solid #000;
                    border-top: 1px solid #000;
                    transform: rotate(-135deg) translate(143%, -24%);
                    position: absolute;
                    right: 10px;
                    top: 50%;
                    transition: transform ease-in-out 200ms;
                }

                &.on {
                    &:after {
                        transform: rotate(45deg) translate(143%, -24%);
                        transition: transform ease-in-out 200ms;
                    }
                }
            }

            .depth2 {
                > li {
                    font-size: 16px;
                    border-bottom: 1px solid rgba(0, 0, 0, 0.4);

                    .menu-item {
                        padding: 10px 20px 10px 30px;
                    }
                }
            }
        }
    }
}

.button-close {
    position: absolute;
    right: 0;
    top: 0;
    width: 50px;
    height: 50px;

    &:before,
    &:after {
        content: '';
        display: block;
        width: 33px;
        height: 1px;
        background-color: #222;
        position: absolute;
        left: 9px;
    }
    &:before {
        transform: rotate(45deg);
    }
    &:after {
        transform: rotate(-45deg);
    }
}

.side-menu-enter-active,
.side-menu-leave-active {
    left: 0;
    transition: left ease-in-out 0.5s;
}
.side-menu-enter, .side-menu-leave-to /* .fade-leave-active below version 2.1.8 */ {
    left: -100%;
}
</style>
