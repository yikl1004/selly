<template>
    <div>
        <h1>예제 페이지</h1>
        <TextField
            id="example-seperate"
            label="레이블"
            type="seperateNumber"
            placeholder="입력하세요"
            name="price"
            :validate="validate"
            success-message="성공메시지 입니다"
            error-message="희망한도를 입력해 주세요."
        />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import _ from 'lodash'

@Component
export default class extends Vue {
    /**
     * @category METHODS
     * @title Custom
     */
    validate(value: string): boolean {
        return _.toNumber(value) < 3500
    }
}
</script>

<style scoped></style>
