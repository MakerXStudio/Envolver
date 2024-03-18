#!/usr/bin/env node
import { cwd } from 'process'
import { resolve } from 'path'
import { summariseVariables } from './summarise-variables'
import { updateVariables } from './update-variables'
import { Command, Option } from 'commander'
import { CheckCommandOptions } from './types'
import { outputResults } from './results'

const program = new Command()

program
  .name('envolver')
  .description(`A CLI tool to check what environment variables have changed since your local .env file was last updated.`)
  .version('1.0.1')

program
  .command('check')
  .description('Check if environment variables have changed')
  .argument('<filePath>', 'Path to the .env file')
  .addOption(new Option('-o, --output <output>', 'Output method for changes').choices(['json', 'console']).default('console'))
  .addOption(new Option('-u --update', 'Update the vars.json file with the new values'))
  .action((filePath: string, options: CheckCommandOptions) =>
  {
    const variablesChanged = summariseVariables(resolve(cwd(), filePath))

    if (variablesChanged?.length)
    {
      console.log('Some environment variables have changed')

      const output = outputResults(variablesChanged, options.output)

      console.log(output)
    } else
    {
      console.log('No environment variables have changed')
    }

    if (options?.update)
    {
      updateVariables(resolve(cwd(), filePath))
    }

    process.exit(1)
  })

program
  .command('update')
  .description('Update the environment variables')
  .argument('<filePath>', 'Path to the .env file')
  .action((filePath: string) =>
  {
    updateVariables(resolve(cwd(), filePath))
  })

program.parse()
