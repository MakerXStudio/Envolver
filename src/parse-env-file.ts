import type { EnvVariable, Section, SectionTitle, SectionComment, EnvFile } from './types'

const variableData = (data: string, comment?: string) => {
  const [name, value] = data.split('=')
  return { name, value, comment }
}

export const parseEnvFile = (envFileContents: string): EnvFile => {
  const envData: EnvFile = []
  let lineEnding: string = '\n'

  if (envFileContents.includes('\r\n')) {
    lineEnding = '\r\n'
  }

  const [uncategorised, ...sectionData] = envFileContents.split(`${lineEnding}${lineEnding}`)

  let variableComment: string | undefined = undefined

  for (const line of uncategorised.split(lineEnding)) {
    if (line.startsWith('#')) {
      variableComment = line.replace('#', '').trim()
      continue
    }
    envData.push(variableData(line, variableComment))
    variableComment = undefined
  }

  sectionData.forEach((section) => {
    const sectionVariables: EnvVariable[] = []
    let title: SectionTitle = null
    let sectionComment: SectionComment = null

    section.split('\n').forEach((line) => {
      if (line.startsWith('##')) {
        title = line.replace('##', '').trim()
        return
      } else if (line.startsWith('#') && !sectionVariables.length) {
        if (!sectionComment) {
          sectionComment = ''
        }

        sectionComment = `${sectionComment}${line.replace('#', '').trim()}\n`

        return
      } else if (line.startsWith('#')) {
        variableComment = line.replace('#', '').trim()
        return
      }

      sectionVariables.push(variableData(line, variableComment))
      variableComment = undefined
    })

    envData.push({ name: title, comment: sectionComment, variables: sectionVariables } as Section)
  })

  return envData
}
