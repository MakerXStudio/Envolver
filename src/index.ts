#!/usr/bin/env node
import { argv, cwd } from 'process'
import { resolve } from 'path'
import summariseVariables from './summarise-variables'
import updateVariables from './update-variables'

const [, , command, filePath] = argv

if (command === 'check') {
  if (!filePath) {
    console.error('Please provide a file path')
    process.exit(1)
  }

  const variablesChanged = summariseVariables(resolve(cwd(), filePath))

  if (variablesChanged?.length) {
    console.log('Some environment variables have changed, check the vars.diff.json file to see what has changed')
    process.exit(1)
  }
} else if (command === 'update') {
  if (!filePath) {
    console.error('Please provide a file path')
    process.exit(1)
  }

  updateVariables(resolve(cwd(), filePath))
} else {
  console.error('Please provide a command')
  process.exit(1)
}
