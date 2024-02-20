import { writeFileSync } from "fs";
import { EnvFile } from "./index.d";
import { resolve } from "path";
import parseEnvFile from "./parseEnvFile";

const updateVariables = (envFile: string) =>
{
	const envData: EnvFile = parseEnvFile(envFile)

	writeFileSync(
		resolve(process.cwd(), 'vars.json'),
		JSON.stringify(
			envData,
			null,
			2
		),
		'utf8'
	)
}

export default updateVariables