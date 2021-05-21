import { registerCommonComponent } from '@components/common/index'
import registerPlugins from '@utils/plugins'

// TODO: base64 코드를 blob 객체로 변환해주는 함수(만들지 말지 판단 안됨 지금은...)
// export const dataURLtoFile = (dataurl: string, filename: string): File => {
//     const arr = dataurl.split(',')
//     const mime = (arr[0].match(/:(.*?);/) as RegExpMatchArray)[1]
//     const bstr = atob(arr[1])
//     let n = bstr.length
//     const u8arr = new Uint8Array(n)

//     while (n--) {
//         u8arr[n] = bstr.charCodeAt(n)
//     }

//     return new File([u8arr], filename, { type: mime })
// }

// //Usage example:
// const file = dataURLtoFile('data:text/plain;base64,aGVsbG8gd29ybGQ=', 'hello.txt')
// console.log(file)

export const initialize = (): void => {
    registerPlugins()
    registerCommonComponent()
}

export { registerCommonComponent, registerPlugins }
