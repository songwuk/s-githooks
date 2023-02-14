/* eslint-disable no-console */
import type { SpawnSyncReturns } from 'node:child_process'
import { spawnSync } from 'node:child_process'
import { _checkgitexist } from '.'
/**
 * Command
 */
export function command(command: string, args: string[]): SpawnSyncReturns<Buffer> {
  return spawnSync(command, args, { stdio: 'inherit' })
}
/**
 * Install
 */
export function install(): void {
  _checkgitexist()
  try {
    const hookDir = '.git/hooks/'
    const { error } = command('git', ['config', 'core.hooksPath', hookDir])
    if (error)
      throw error
    const { error: rmError } = command('rm', ['-rf', hookDir])
    if (rmError)
      throw rmError
  }
  catch (error) {
    console.log(`[ERROR]: ${error}`)
  }
}
