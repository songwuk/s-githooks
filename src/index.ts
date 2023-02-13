/* eslint-disable no-console */
import { chmodSync, existsSync, mkdirSync, readFileSync, statSync, unlinkSync, writeFileSync } from 'node:fs'
import { dirname, join, normalize } from 'node:path'
import { cwd } from 'node:process'
import { fileURLToPath } from 'node:url'
const _dirname = dirname(fileURLToPath(new URL(import.meta.url)))
const GIT_HOOKS = JSON.parse(readFileSync(join(_dirname, './json/hooks.json'), { encoding: 'utf-8' }))
/**
 * 检查.git是否存在
 */
function _checkgitexist(rootPath = cwd()) {
  if (!existsSync(join(rootPath, './.git')))
    throw new Error('[INFO]: .git can\'t be found')
}
/**
 * 获取当前项目的package.json文件
 * @param projectDir string
 */
function _getPackageJson(projectDir = cwd()): any {
  const projectRootPath = normalize(join(projectDir, './package.json'))
  if (!statSync(projectRootPath).isFile())
    throw new Error('[ERROR]: Package.json doesn\'t exist')
  const getPackageJson = readFileSync(projectRootPath, { encoding: 'utf-8' })
  return {
    packageJsonContent: JSON.parse(getPackageJson),
  }
}
/**
 * 校验是否安装了s-githooks
 * @param projectPath
 */
function checkGitHooksInDependencies(projectPath = cwd()) {
  if (typeof projectPath !== 'string')
    throw new TypeError('[ERROR]: Package.json path is not a string')
  const { packageJsonContent } = _getPackageJson(projectPath)
  return 's-githooks' in packageJsonContent.devDependencies
}
/**
 *
 */
function setHooksConfig(projectRootPath = cwd()) {
  const config = _getConfig(projectRootPath)
  if (!config)
    throw new Error('[ERROR] Config was not found!')
  for (const hook of GIT_HOOKS) {
    if (Object.prototype.hasOwnProperty.call(config, hook))
      _setHook(hook, config[hook], projectRootPath)
    else
      _removeHooks(hook, projectRootPath)
  }
}
function _getConfig(projectRootPath: string) {
  const { packageJsonContent } = _getPackageJson(projectRootPath)
  return packageJsonContent['s-githooks']
}
function _removeHooks(hook: string, rootPath = cwd()) {
  const hookPath = normalize(join(rootPath, './.git/hooks', hook))
  if (existsSync(hookPath))
    unlinkSync(hookPath)
}
function _setHook(hook: string, command: string, rootPath = cwd()) {
  _checkgitexist()
  const hookCommand = `#!/bin/sh\n${command}`
  const hookDirectory = normalize(join(rootPath, './.git/hooks/'))
  const hookPath = normalize(hookDirectory + hook)
  const normalizedHookDirectory = normalize(hookDirectory)
  if (!existsSync(normalizedHookDirectory))
    mkdirSync(normalizedHookDirectory)
  writeFileSync(hookPath, hookCommand)
  chmodSync(hookPath, 0o0755)
  console.log(`[INFO] Successfully set the ${hook} with command: ${command}`)
}
export {
  checkGitHooksInDependencies,
  setHooksConfig,
}
