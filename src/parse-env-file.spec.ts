import { describe, it, expect } from 'vitest'
import { parseEnvFile } from './parse-env-file'

describe('parseEnvFile', () => {
  describe('when parsing a single line', () => {
    it('should return that line as an EnvVariable obj', () => {
      const result = parseEnvFile('SOME_VAR="Some value"')

      expect(result.length).toBe(1)
      const [first] = result
      expect(first.name).toBe('SOME_VAR')
    })
  })
})
