# Envolver

This is a command-line interface (CLI) tool designed to check and update environment variables in your local .env file. It's written in TypeScript and uses the commander package to handle command-line inputs.

## Check Variables
To check if any environment variables have changed, use the check command followed by the path to your .env file.

```
envolver check <filePath> -o <output>
```

### Options

| Option                  | Description                                                | Default   |
| ----------------------- | ---------------------------------------------------------- | --------- |
| `<filePath>`            | The path to your `.env` file. This is a required argument. | N/A       |
| `-o, --output <output>` | The output method. This can be either 'json' or 'console'. | 'console' |

## Update Variables
To update the environment variables in your .env file, use the update command followed by the path to your .env file.

```
envolver update <filePath>
```

This is best run automatically, eg. as part of a GitHub Actions workflow, to ensure that the file is kept up to date with the latest changes.

```yaml
name: Update Environment Variables

on:
  push:
    branches: [prod]

jobs:
  build:
    runs-on: ubuntu-22.04
    steps:
      - name: Checkout Repo Code
        uses: actions/checkout@v3

      - name: Update Variables
        run: npx envolver update .env.sample

			- name: Commit to repo
        uses: actions/github-script@v6
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          script: |
            github.rest.git.createCommit({
              owner: context.repo.owner,
              repo: context.repo.repo,
              message: "Updated environment variables",
              tree: env.object_tree,
              parents: [env.parent]
            });
```

If you prefer not to have an additional file added to your repo, you can run the watch file against a sample .env file, then check against those results, eg.

```
envolver update .env.sample
```

```
envolver check .env --output=json
```