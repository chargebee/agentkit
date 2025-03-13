# Contributing to Chargebee MCP Server

We welcome all contributions! If you’ve found a bug or have a feature request, please [open an issue](/issues) – your feedback helps us improve

To make changes yourself, follow these steps:

1. [Fork](https://help.github.com/articles/fork-a-repo/) this repository and [clone](https://help.github.com/articles/cloning-a-repository/) it locally.
2. Make your changes in the [packages/modelcontextprotocol](/packages/modelcontextprotocol) directory.
3. Submit a [pull request](https://help.github.com/articles/creating-a-pull-request-from-a-fork/)

## Development

Since this repository is a monorepo, you can run the following commands to get started:

```bash
# Install dependencies
pnpm install

# Build
pnpm build

```

## Debugging the Server

To debug your server, you can use the [MCP Inspector](https://github.com/modelcontextprotocol/inspector).

First build the server

```
pnpm build
```

Run the following command in your terminal:

```
# Start MCP Inspector and server with all tools
npx @modelcontextprotocol/inspector node dist/index.js
```
