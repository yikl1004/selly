<template>
    <div class="container">
        <h1>메인</h1>
        <CheckBoxGroup id="policy" name="policy" title="이용약관동의">
            <CheckBox id="test-check-box1" label="개인정보처리방침" name="test-check-box1" :default-value="false" />
            <CheckBox id="test-check-box2" label="개인정보처리방침" name="test-check-box2" :default-value="false" />
            <CheckBox id="test-check-box3" label="개인정보처리방침" name="test-check-box3" :default-value="false" />
            <CheckBox id="test-check-box4" label="개인정보처리방침" name="test-check-box4" :default-value="false" />
        </CheckBoxGroup>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import CheckBoxGroup from '@components/form/CheckBoxGroup.vue'

interface CheckboxProps {
    id: string
    label: string
    name: string
    defaultValue: boolean
}

type CheckboxList = { [key: string]: CheckboxProps }

@Component({
    components: {},
})
export default class Main extends Vue {
    private wow: boolean = false
    private checkboxes: CheckboxList = {
        policy1: {
            id: 'test-check-box1',
            label: '개인정보처리방침',
            name: 'test-check-box1',
            defaultValue: false,
        },
        policy2: {
            id: 'test-check-box2',
            label: '개인정보처리방침',
            name: 'test-check-box2',
            defaultValue: false,
        },
        policy3: {
            id: 'test-check-box3',
            label: '개인정보처리방침',
            name: 'test-check-box3',
            defaultValue: false,
        },
        policy4: {
            id: 'test-check-box4',
            label: '개인정보처리방침',
            name: 'test-check-box4',
            defaultValue: false,
        },
    }
}
</script>

<style scoped></style>
