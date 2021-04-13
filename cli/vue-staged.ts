import child from 'child_process'
import path from 'path'
import chalk from 'chalk'
import shell from 'shelljs'

const projectRoot = path.join(process.cwd())

shell.echo(chalk.green('vuejs type check start!! :)'))
shell.echo(chalk.yellow(process.cwd()))

try {
    child.execSync(`npx vtc --workspace ${projectRoot} --srcDir ${path.join(projectRoot, 'src')}`, {
        cwd: projectRoot,
        encoding: 'utf-8',
        stdio: 'inherit',
    })
} catch (e) {
    shell.echo(chalk.red('an unknown error has occurred.'))
    process.exit(1)
}

process.exit(0)
