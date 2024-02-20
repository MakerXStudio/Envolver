import type { EnvVariable, Section, EnvVariableDiff, SectionDiff } from './index.d';

const compareData = (variable: EnvVariable | Section, existingVariable: EnvVariable | Section) =>
{
	if (
		'value' in variable &&
		'value' in existingVariable &&
		variable.value !== existingVariable.value
	)
	{
		return true
	}

	// TODO: Check the changed comment works
	if (
		'comment' in variable &&
		'comment' in existingVariable &&
		variable.comment !== existingVariable.comment
	)
	{
		return true
	}

	return false
}

const checkExists = (current: (EnvVariable | Section), compare: (EnvVariable | Section)[]) => compare.find((value: EnvVariable | Section) => value.name === current.name)

const checkSection = (current: Section, compare: Section) =>
{
	const data: SectionDiff = {
		...current,
		variables: [],
		changed: false
	}

	if (
		compareData(data, compare)
	)
	{
		data.changed = true
	}

	current.variables?.forEach((variable: EnvVariable) =>
	{
		const changedVariable = checkVariables(variable, compare.variables) as EnvVariableDiff

		if (changedVariable)
		{
			data.variables.push(changedVariable)
			data.changed = true
		}
	})

	return data
}

const checkVariables = (current: (EnvVariable | Section), compare: (EnvVariable | Section)[]) =>
{
	// Check if variable exists
	const exists = checkExists(current, compare)

	// If it doesn't exist, is brand new
	if (!exists)
	{
		const data: EnvVariable | Section = current

		if ('variables' in data)
		{
			data.variables = data.variables?.map((v) => ({ ...v, new: true }))
		}

		return {
			...data,
			new: true
		} as EnvVariableDiff
	}

	if (
		'variables' in current &&
		'variables' in exists
	)
	{
		// TODO: working on uncategorised variables for now
		// Looking at a section

		const data: SectionDiff = checkSection(current as Section, exists as Section)

		if ('changed' in data && data.changed)
		{
			return data as SectionDiff
		}

		return
	}

	// If it does exist, check if it's changed
	if (
		compareData(current as EnvVariable, exists as EnvVariable)
	)
	{
		return {
			...current,
			changed: true
		} as EnvVariableDiff | SectionDiff
	}

	return
}

export default checkVariables