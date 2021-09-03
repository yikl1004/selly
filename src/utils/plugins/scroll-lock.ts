import type { PluginObject } from 'vue'

const scrollLock: PluginObject<undefined> = {
    install(_Vue) {
        const bodyScrollLock = () => {
            const $body = document.querySelector('body') as HTMLBodyElement
            let scrollPosition = 0

            return {
                disable() {
                    scrollPosition = window.pageYOffset
                    $body.style.overflow = 'hidden'
                    $body.style.position = 'fixed'
                    $body.style.top = `-${scrollPosition}px`
                    $body.style.width = '100%'
                },
                enable() {
                    $body.style.removeProperty('overflow')
                    $body.style.removeProperty('position')
                    $body.style.removeProperty('top')
                    $body.style.removeProperty('width')
                    window.scrollTo(0, scrollPosition)
                },
            }
        }
        const scrollLock = bodyScrollLock()

        _Vue.directive('scroll-lock', {
            inserted(el, binding) {
                if (binding.value) {
                    scrollLock.disable()
                }
            },
            componentUpdated(el, binding) {
                if (binding.value) {
                    scrollLock.disable()
                } else {
                    scrollLock.enable()
                }
            },
            unbind() {
                scrollLock.enable()
            },
        })
    },
}

export default scrollLock
