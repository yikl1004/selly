<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <p>에멘탈 EDK 예제</p>
        <ul>
            <li>
                <a
                    href="https://data.emmental.co.kr"
                    target="_blank"
                    rel="noopener"
                >
                    emmental-data
                </a>
            </li>
        </ul>
        <ul>
            <li>
                <a
                    class="btn"
                    target="_blank"
                    rel="noopener"
                    @click="signInBznav"
                >
                    signInBznav
                </a>
            </li>
            <li>
                <a
                    class="btn"
                    target="_blank"
                    rel="noopener"
                    @click="signUpBznav"
                >
                    signUpBznav
                </a>
            </li>
            <li>
                <a
                    class="btn"
                    target="_blank"
                    rel="noopener"
                    @click="openDataSync"
                >
                    openDataSync
                </a>
            </li>
            <li>
                <a
                    class="btn"
                    target="_blank"
                    rel="noopener"
                    @click="openInsight"
                >
                    openInsight
                </a>
            </li>

            <li>
                <a
                    class="btn"
                    target="_blank"
                    rel="noopener"
                    @click="signOutBznav"
                >
                    signOutBznav
                </a>
            </li>
            <li>
                <a
                    class="btn"
                    target="_blank"
                    rel="noopener"
                    @click="openDevtool"
                >
                    openDevtool
                </a>
            </li>
        </ul>
        <div
            id="em_embed"
            style="
                height: 900px;
                width: 500px;
                border: 1px #eee solid;
                background: #f3f3f3;
            "
        ></div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class EDKSample extends Vue {
    @Prop(String)
    readonly msg!: string

    init() {
        this.$edkHost.init()
    }

    signInBznav() {
        this.$edkHost.signInBznav({
            bznavSyncToken: 'syncTokenTest',
        })
    }

    signUpBznav() {
        this.$edkHost.signUpBznav({
            bznavSyncToken: 'syncTokenTest',
        })
    }

    signOutBznav() {
        this.$edkHost.signOutBznav({})
    }

    openDataSync() {
        this.$edkHost.openDataSync({
            eventListener: event => {
                console.log('EVENT', event)
            },
        })
    }

    openInsight() {
        this.$edkHost.openInsight({
            eventListener: event => {
                console.log('EVENT', event)
            },
        })
    }

    openDevtool() {
        this.$edkHost.openDevtool({
            eventListener: event => {
                console.log('EVENT', event)
            },
        })
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
    margin: 40px 0 0;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
}

.btn {
    background-color: #5e4caf; /* Green */
    border: none;
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    cursor: pointer;
}
</style>
