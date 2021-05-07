<template>
    <!-- <div class="select-field" :class="isError">
        <label :for="id" :class="{ ir: hiddenLabel }">{{ label }}</label>
        <div class="input-area" :class="{ focus: focusedClass }">
            <input
                :id="id"
                ref="input"
                :value="displayValue"
                autocomplete="new-password"
                :pattern="pattern"
                :maxlength="maxlength"
                :placeholder="placeholder"
                :type="inputType"
                :readonly="readonly"
                @input="onInput"
                @keydown="onKeydown"
                @focus="onFocus"
                @blur="onBlur"
            />
            <span v-if="unit" class="unit">
                {{ unit }}
            </span>
            <button v-if="!readonly && !!value.length" type="button" class="clear" @click="clearValue">
                <i />
                <span class="ir">전체삭제</span>
            </button>
        </div>
        <p v-if="message" class="message">
            {{ message }}
        </p>
    </div> -->
    <div>
        <button type="button" @click="openModal">
            모달
        </button>
        <BottomSheet :show="visible" :title="title" @close="closedModal"></BottomSheet>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class SelectField extends Vue {
    private visible: boolean = false

    @Prop({ type: String })
    readonly title!: string

    openModal() {
        this.visible = true
    }

    closedModal() {
        this.visible = false
    }
}
</script>

<style scoped lang="scss" src="./SelectField.scss"></style>
