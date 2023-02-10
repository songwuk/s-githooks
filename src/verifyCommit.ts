/**
 * commit check
 */
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import chalk from 'chalk'

const dirname = path.dirname(fileURLToPath(new URL(import.meta.url)))
const msgPath = path.resolve(dirname, '../.git/COMMIT_EDITMSG')
const msg = readFileSync(msgPath, 'utf-8').trim()
console.error(chalk.red(`now commit: ${msg}`))
const commitRE
  = /^(revert: )?(feat|fix|docs|dx|style|refactor|perf|test|workflow|build|ci|chore|types|wip|release)(\(.+\))?: .{1,50}/

if (!commitRE.test(msg)) {
  console.error(
    `  ${chalk.bgRed.white(' ERROR ')} ${chalk.red(
      'invalid commit message format.',
    )}\n\n${
      chalk.red(
        '  Proper commit message format is required for automated changelog generation. Examples:\n\n',
      )
    }    ${chalk.green('feat(compiler): add \'comments\' option')}\n`
      + `    ${chalk.green(
        'fix(v-model): handle events on blur (close #28)',
      )}`,
  )
  process.exit(1)
}
