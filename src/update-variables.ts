import { readFileSync, writeFileSync } from 'fs'
import { EnvFile } from './types'
import { resolve } from 'path'
import parseEnvFile from './parse-env-file'

const updateVariables = (envFile: string) => {
  const envContents = readFileSync(envFile, 'utf8')

  const envData: EnvFile = parseEnvFile(envContents)

  writeFileSync(resolve(process.cwd(), 'vars.json'), JSON.stringify(envData, null, 2), 'utf8')
}

export default updateVariables
