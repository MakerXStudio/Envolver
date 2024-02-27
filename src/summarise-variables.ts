import { resolve } from 'path'
import { readFileSync, accessSync } from 'fs'
import type { EnvFile } from './types'
import { diffVars } from './diff-variables'
import { parseEnvFile } from './parse-env-file'
import { cwd } from 'process'

export const summariseVariables = (envFile: string) => {
  const envContents = readFileSync(envFile, 'utf8')

  const envData: EnvFile = parseEnvFile(envContents)

  let existingEnvs: string = '[]'

  try {
    accessSync(resolve(cwd(), 'vars.json'))

    existingEnvs = readFileSync(resolve(cwd(), 'vars.json'), 'utf8')
  } catch {
    console.error('Something broke')
  }

  const existingEnvsData: EnvFile = JSON.parse(existingEnvs)
  const difference = diffVars(existingEnvsData, envData)

  return difference
}
