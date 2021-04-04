<template>
    <fragment>
        <ul>
            <li>
                <selly-link href="/">
                    main
                </selly-link>
            </li>
            <li>
                <selly-link href="/example">
                    example
                </selly-link>
            </li>
        </ul>
    </fragment>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class DevMenu extends Vue {}
</script>

<style scoped></style>
