#! /usr/bin/env node
import { setHooksConfig } from './lib/index.mjs'
try {
  setHooksConfig(process.cwd())
  console.log('[INFO]: Successfully set all git hooks')
} catch (e) {
  console.log('[ERROR]:, Was not able to set git hooks. Error: ' + e)
}
