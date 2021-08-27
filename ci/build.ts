import child from 'child_process'
import path from 'path'
import os from 'os'
import shell from 'shelljs'
import chalk from 'chalk'
import dayjs from 'dayjs'

const args = process.argv.slice(2)
const staging = args[0]
const projectRoot = path.join(process.cwd())

if (!staging) {
    shell.echo(chalk.red('> staging mode params is required.'))
    process.exit(1)
}

shell.echo(chalk.green(`> selly 0.1 client staging ${staging} mode build start ~ !! :)`))

try {
    shell.rm('-rf', ['./dist', './dist.zip'])

    const now = dayjs().format('YYYYMMDD')
    const githash = child.execSync('git rev-parse --short HEAD').toString().trim()
    const rootPath = `${now}_${githash}`

    child.execSync(`yarn build --mode ${staging}`, {
        cwd: projectRoot,
        encoding: 'utf-8',
        stdio: 'inherit',
    })

    const moveFiles = shell.find(`${process.cwd()}/dist`).filter(file => file.match(/\/(css|img|js|fonts)$/))

    shell.mkdir('-p', `dist/${rootPath}`)
    shell.mv(moveFiles, `dist/${rootPath}`)

    if (os.platform() !== 'win32') {
        child.execSync(`find . -type f -print | sed -e 's/\\.\\///g;/\\.$/d;' > filelist.txt`, {
            cwd: `${projectRoot}/dist`,
            encoding: 'utf-8',
            stdio: 'inherit',
        })

        child.execSync(`zip -r ../dist.zip ./*`, {
            cwd: `${projectRoot}/dist`,
            encoding: 'utf-8',
            stdio: 'inherit',
        })
    }
} catch (error) {
    shell.echo(chalk.red('> an unknown error has occurred.'))
    process.exit(1)
}

process.exit(0)
