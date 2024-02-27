import { cwd } from 'process'
import { resolve } from 'path'
import { writeFileSync } from 'fs'
import type { EnvFileDiff, ResultsOutput } from './types'

export const outputResults = (difference: EnvFileDiff, output: ResultsOutput) => {
  if (output === 'json') {
    writeFileSync(resolve(cwd(), 'vars.diff.json'), JSON.stringify(difference, null, 2), 'utf8')
    return 'Check the vars.diff.json file for the changes'
  }

  if (output === 'console') {
    return JSON.stringify(difference, null, 2)
  }
}
