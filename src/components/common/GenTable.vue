<template>
    <div class="tbl-chart">
        <div class="table-box">
            <div class="table-scroll">
                <table>
                    <caption>
                        {{
                            heads.join(', ')
                        }}
                        로 구성된 표입니다.
                    </caption>
                    <colgroup v-if="cols">
                        <!-- <col style="width: 33%" />
                        <col style="width: 33%" /> -->
                        <col
                            v-for="(item, index) in cols"
                            :key="`${name}-table-cols-${index}`"
                            :style="`width: ${
                                _.isNumber(item) ? `${item}%` : item
                            }`"
                        />
                    </colgroup>
                    <thead>
                        <tr>
                            <th
                                v-for="(item, index) in heads"
                                :key="`${name}-table-th-${index}`"
                                scope="col"
                            >
                                {{ item }}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="(row, rowIndex) in contents"
                            :key="`${name}-table-tr-${rowIndex}`"
                        >
                            <td
                                v-for="(item, index) in row"
                                :key="`${name}-table-tr-${rowIndex}-td-${index}`"
                                class="t-center"
                            >
                                {{ item }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class GenTable extends Vue {
    /** 셀 넓이 */
    @Prop({ type: Array, required: true })
    readonly cols!: (number | string)[]

    /** 제목 */
    @Prop({ type: Array, required: true })
    readonly heads!: number[]

    /** 내용 */
    @Prop({ type: Array, required: true })
    readonly contents!: string[][]

    /** table 닉네임 */
    @Prop({ type: String, required: true })
    readonly name!: string
}
</script>

<style scoped></style>
