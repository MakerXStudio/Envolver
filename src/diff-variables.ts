import checkVariables from './check-variables'
import type { EnvVariable, Section, EnvFile, EnvFileDiff } from './types'

const diffVars = (existingEnvVariables: EnvFile, newEnvFile: EnvFile) => {
  const changedValues: EnvFileDiff = []

  newEnvFile.forEach((i: EnvVariable | Section) => {
    const changedVariable = checkVariables(i, existingEnvVariables)

    if (changedVariable) {
      changedValues.push(changedVariable)
    }
  })

  return changedValues
}

export default diffVars
