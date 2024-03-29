#! /usr/bin/env node
/* eslint-disable no-console */
import { cwd } from 'node:process'
import { normalize } from 'node:path'
import { checkGitHooksInDependencies, setHooksConfig } from '.'
/**
 * modified https://github.com/toplenboren/simple-git-hooks/blob/master/postinstall.js
 */
function postinstall() {
  const projectDir = normalize(cwd())
  if (checkGitHooksInDependencies(projectDir)) {
    try {
      setHooksConfig(projectDir)
    }
    catch (error) {
      console.log(`[ERROR]: ${error}`)
    }
  }
  else {
    console.log('[WARN]: You should fill in the correct configuration')
  }
}
postinstall()
