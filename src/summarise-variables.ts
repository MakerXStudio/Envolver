import { resolve } from 'path'
import { readFileSync, writeFileSync, accessSync } from 'fs'
import type { EnvFile } from './types'
import diffVars from './diff-variables'
import parseEnvFile from './parse-env-file'

const summariseVariables = (envFile: string) => {
  const envContents = readFileSync(envFile, 'utf8')

  const envData: EnvFile = parseEnvFile(envContents)

  let existingEnvs: string = '[]'

  try {
    accessSync(resolve(process.cwd(), 'vars.json'))

    existingEnvs = readFileSync(resolve(process.cwd(), 'vars.json'), 'utf8')
  } catch {
    console.error('Something broke')
  }

  const existingEnvsData: EnvFile = JSON.parse(existingEnvs)
  const difference = diffVars(existingEnvsData, envData)

  // Compare the difference and write to the diff file
  writeFileSync(resolve(process.cwd(), 'vars.diff.json'), JSON.stringify(difference, null, 2), 'utf8')

  return difference
}

export default summariseVariables
