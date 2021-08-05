import { Component, Vue } from 'vue-property-decorator'

/**
 * @description
 * @role mixin component
 * page가 되는 컴포넌트에서 확장되는 mixin
 * page 단위로 쓰이틑 컴포넌트에 mixin으로 확장해서 사용할 수 있다
 */
@Component
export default class PageView extends Vue {
    private _currentRouteName = ''

    /** @Lifecycle */
    mounted() {
        const currentRouteName: string = this.$route.name || ''
        this._currentRouteName = currentRouteName === 'Navigation' ? '' : currentRouteName
    }

    beforeDestroy() {
        console.log('@@@ PageView - beforeDestroy >>> ', this._currentRouteName)
        this.$store.commit('common/changeReferrer', this._currentRouteName)
    }
}
