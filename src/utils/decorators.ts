import { createDecorator } from 'vue-class-component'

// 컴포넌트 옵션을 추가하려고 할때 사용...
export const RegisterHook = createDecorator((options, key) => {
    const originalMethod = options.methods![key]

    Object.assign(options, {
        [key]: originalMethod,
    })
})
