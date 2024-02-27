export type EnvVariable = {
  name: string
  value?: string
  comment?: string
  placeholder?: string
}

export type Section = {
  name: SectionTitle
  comment: SectionComment
  variables: EnvVariable[]
}

export type NewEnvVariableDiff = EnvVariable & {
  new: boolean
}

export type ChangedEnvVariableDiff = EnvVariable & {
  changed: boolean
}

export type EnvVariableDiff = NewEnvVariableDiff | ChangedEnvVariableDiff

export type NewSectionDiff = Section & {
  new: boolean
  variables: EnvVariableDiff[]
}

export type ChangedSectionDiff = Section & {
  changed: boolean
  variables: EnvVariableDiff[]
}

export type SectionDiff = NewSectionDiff | ChangedSectionDiff

export type SectionTitle = string | null

export type SectionComment = string | null

export type EnvFile = (EnvVariable | Section)[]

export type EnvFileDiff = (EnvVariableDiff | SectionDiff)[]

export type ResultsOutput = 'json' | 'console'

export type CheckCommandOptions = {
  output: ResultsOutput
}
