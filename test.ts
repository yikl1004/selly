function exe() {
    if ('argv' in process) {
        console.log('yes!!!!!')
    } else {
        console.log('no!!!!!')
    }
}
exe()
console.log('staging ::: ', process.argv.slice(2))

// process.exit()
