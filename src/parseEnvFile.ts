import { readFileSync } from 'fs';
import type { EnvVariable, Section, SectionTitle, SectionComment, EnvFile } from './index.d';

const variableData = (data: string, comment?: string) =>
{
	const [name, value] = data.split('=')
	return { name, value, comment }
}

const parseEnvFile = (envFile: string): EnvFile =>
{
	const envContents = readFileSync(envFile, 'utf8')
	const envData: EnvFile = []
	const [uncategorised, ...sectionData] = envContents.split('\n\n')

	let variableComment: string | undefined = undefined;

	uncategorised.split('\n').forEach(line =>
	{
		if (line.startsWith('#'))
		{
			variableComment = line.replace('#', '').trim()
			return
		}
		envData.push(variableData(line, variableComment))
		variableComment = undefined
	})

	sectionData.forEach(section =>
	{
		const sectionVariables: EnvVariable[] = []
		let title: SectionTitle = null
		let sectionComment: SectionComment = null

		section.split('\n').forEach(line =>
		{
			if (line.startsWith('##'))
			{
				title = line.replace('##', '').trim()
				return;
			}
			else if (line.startsWith('#') && !sectionVariables.length)
			{
				if (!sectionComment)
				{
					sectionComment = ''
				}

				sectionComment = `${ sectionComment }${ line.replace('#', '').trim() }\n`

				return;
			}
			else if (line.startsWith('#'))
			{
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

export default parseEnvFile