import { Component, Vue } from 'vue-property-decorator'

/**
 * page가 되는 컴포넌트에서 확장되는 mixin
 */
@Component
export default class PageView extends Vue {
    /** 뒤로가기 */
    back(): void {
        this.$router.back()
    }

    // created(): void {}

    /**  */
}
