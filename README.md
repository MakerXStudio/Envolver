# Envolver

Envolver is a CLI (Command Line Interface) tool that streamlines the management of environment variables in your local .env file. Developed in TypeScript, it simplifies the task of handling frequently changing environment variables, especially in projects with multiple contributors. For a more detailed explanation of its uses and some real-life scenarios where Envolver shines, check out [our blog post](https://blog.makerx.com.au/envolver-a-cli-tool-for-managing-environment-variables/).

## Environment Variables

Environment variables are key-value pairs typically stored in a .env file. They are used to store sensitive information like API keys and passwords separate from the main codebase. These variables often change, especially in projects with multiple contributors, which can make them difficult to keep updated. Envolver helps manage these changes effectively.

## Check Variables

The `check` command compares your local .env file to the latest changes in the code repository.

```bash
envolver check <filePath> -o <output>
```

### Options

| Option                  | Description                                           | Default   |
| ----------------------- | ----------------------------------------------------- | --------- |
| `<filePath>`            | The path to your `.env` file. Required argument.      | N/A       |
| `-o, --output <output>` | The output method. Can be either 'json' or 'console'. | 'console' |

## Update Variables

The `update` command generates a vars.json file that summarizes your current environment variables. This file can be included in the code repository or added to your .gitignore file if it contains sensitive information. 

```bash
envolver update <filePath>
```

Envolver also organizes the variables into sections for easier management.

## Automating Updates

You can configure Envolver to run automatically as part of a GitHub Actions workflow. This ensures your environment variables are always synchronized with the latest changes in the code repository.

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
