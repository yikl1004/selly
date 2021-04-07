<template>
    <div>
        <ul>
            <li>
                <Link href="/">
                    main
                </Link>
            </li>
            <li>
                <Link external href="/example">
                    example
                </Link>
            </li>
        </ul>
        <component :is="layout">
            <router-view />
        </component>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import DefaultLayout from '@/layout/DefaultLayout.vue'
import NoneLayout from '@/layout/NoneLayout.vue'

type LayoutType = 'default' | 'none'

@Component({
    components: {
        default: DefaultLayout,
        none: NoneLayout,
    },
})
export default class Layout extends Vue {
    get layout(): LayoutType {
        return this.$route.meta.layout || 'default'
    }

    public mounted(): void {
        console.log(this)
    }
}
</script>

<style lang="scss"></style>
