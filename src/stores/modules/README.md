# Sample code

```ts
import { Module, VuexModule, MutationAction, Mutation } from 'vuex-module-decorators'
import TestService, { TestResponse, TestParameters } from '@services/test'

export interface TestState {
    TestInfo: TestInfo | null
}

declare global {
    type TestInfoParams = TestParameter['testInfo']
    type TestInfo = TestResponse['testInfo']
}

@Module({ name: 'auth', namespaced: true })
export default class Test extends VuexModule<TestState> {
    public testInfo: TestInfo | null = null

    @Mutation
    init() {
        this.testInfo = null
    }

    @Mutation
    setTestInfo(testInfo: TestInfo) {
        this.TestInfo = testInfo
    }

    @MutationAction
    async getTestInfo(test: TestInfoParams) {
        const state = this.state as TestState
        const { data } = await AuthService.getTestInfo(test)

        return {
            testInfo: data.data,
        }
    }

    /**
     * @getter
     * 메세지를 반환
     */
    get message(): TestInfo['data']['msg'] {
        const { testInfo } = this

        if (testInfo && testInfo!.data) {
            return testInfo!.data.msg || []
        } else {
            return []
        }
    }
}
```
