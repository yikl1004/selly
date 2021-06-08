<template>
    <div>
        <LoginButton />
        <button type="button" @click="openModal">
            모달 테스트
        </button>
        <portal to="bottomSheet">
            <transition
                mode="out-in"
                enter-active-class="animate__animated animate__fadeIn"
                leave-active-class="animate__animated animate__fadeOut"
            >
                <div v-if="show" style="width: 200px height: 80px; background-color: red">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa modi aliquid odit facilis corporis assumenda, ducimus
                    eligendi officiis, aut aperiam provident unde inventore quas dolorum repellat adipisci? Ad, quae hic?
                    <button type="button" @click="closeModal">
                        닫기
                    </button>
                </div>
            </transition>
        </portal>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'

@Component
export default class LoginPage extends Vue {
    show: boolean = false

    openModal() {
        this.show = true
    }

    closeModal() {
        this.show = false
    }
}
</script>

<style scoped></style>
