<template>
    <div class="container">
        <h1>메인</h1>
        <CheckBoxGroup id="policy" :name="groupName" title="약관동의" :list="checkList" list-type="circle" @change="onChange" />
        <!-- <CheckBox id="test" name="test" label="test1" /> -->
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { CheckList } from '@components/form/CheckBoxGroup.vue'

@Component({
    components: {},
})
export default class Main extends Vue {
    private groupName: string = 'group'
    private checkList: CheckList = [
        { value: 'policy', label: '개인정보처리방침 동의', checked: true },
        { value: 'uniq', label: '고유식별정보 처리동의' },
        { value: 'telecom', label: '통신사 이용약관 동의' },
        { value: 'cert', label: '본인확인 서비스 약관 동의' },
    ]

    onChange(list: CheckList) {
        this.checkList = list
    }
}
</script>

<style scoped></style>
