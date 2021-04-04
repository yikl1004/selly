import registerCommonComponent from '@utils/registerCommonComponent'
import registerPlugins from '@utils/registerPlugins'

export { registerCommonComponent, registerPlugins }

export const dataURLtoFile = (dataurl: string, filename: string): File => {
    const arr = dataurl.split(',')
    const mime = (arr[0].match(/:(.*?);/) as RegExpMatchArray)[1]
    const bstr = atob(arr[1])
    let n = bstr.length
    const u8arr = new Uint8Array(n)

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
    }

    return new File([u8arr], filename, { type: mime })
}

//Usage example:
const file = dataURLtoFile('data:text/plain;base64,aGVsbG8gd29ybGQ=', 'hello.txt')
console.log(file)
