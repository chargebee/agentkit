# Chargebee Model Context Protocol (MCP) Server

![MCP Chargebee](https://img.shields.io/badge/MCP-Chargebee-blue)
[![npm version](https://img.shields.io/npm/v/@chargebee/mcp.svg)](https://www.npmjs.com/package/@chargebee/mcp)

Model Context Protocol (MCP) is a [standardized protocol](https://modelcontextprotocol.io/introduction) designed to manage context between large language models (LLMs) and external systems.

The [Chargebee MCP Server](https://npmjs.com/package/@chargebee/mcp) provides a powerful set of tools to enhance developer productivity. It integrates with AI-powered code editors like Cursor, Windsurf, and Cline, as well as general-purpose tools such as Claude Desktop. It works with any MCP Client.

With this MCP Server, you can:  

- Get immediate answers about the Chargebee products and API services.

- Receive context-aware code snippets tailored to your integration needs.

- Access Chargebee's knowledge base, including:
  - Documentation
  - FAQs
  - Release notes
  - And more...


## Prerequisites

- [Node.js LTS](https://nodejs.org/en/download/) - The Chargebee MCP server requires Node.js LTS version to run properly.

## Setup

To run the Chargebee MCP server using [Node.js npx](https://docs.npmjs.com/cli/v10/commands/npx), use the following command:

```sh
npx -y @chargebee/mcp@latest
```

## Available Tools

| Tool                                 | Description                                                                                      |
| -------------------------------------| -------------------------------------------------------------------------------------------------|
| `chargebee_documentation_search`     | Search Chargebee's documentation to retrieve detailed information and usage guides.              |
| `chargebee_code_planner`             | Generate structured code outlines and sample code for integrating Chargebee's APIs and features. |


## Installation


### Cursor

To add this server to Cursor IDE,

1. Go to `Cursor Settings` > `MCP`
2. Click `+ Add new Global MCP Server`
3. Add the following configuration to your global `.cursor/mcp.json` file.

```json
{
  "mcpServers": {
    "chargebee": {
      "command": "npx",
      "args": [
          "-y",
          "@chargebee/mcp"
      ]
    }
  }
}
```
See the [Cursor documentation](https://docs.cursor.com/context/model-context-protocol) for more details. Note: You can also add this to your project specific cursor configuration. (Supported in Cursor 0.46+) 



### Windsurf

To set up MCP with Cascade, navigate to Windsurf - `Settings` > `Advanced Settings` or Command Palette > `Open Windsurf Settings Page`.

Scroll down to the Cascade section and you will find the option to add a new server, view existing servers, and a button to view the raw JSON config file at mcp_config.json.

Here you can click "Add custom server +" to add Chargebee MCP server directly in `mcp_config.json`.

```json
{
  "mcpServers": {
    "chargebee": {
      "command": "npx",
      "args": [
          "-y",
          "@chargebee/mcp"
      ]
    }
  }
}
```

See the [Windsurf documentation](https://docs.codeium.com/windsurf/mcp) for more details.


### Cline

Add the following json manually to your `cline_mcp_settings.json` via Cline MCP Server setting.

```json
{
  "mcpServers": {
    "chargebee": {
      "command": "npx",
      "args": [
          "-y",
          "@chargebee/mcp"
      ]
    }
  }
}
```

### Roo Code

Access the MCP settings by clicking `Edit MCP Settings` in Roo Code settings or using the `Roo Code: Open MCP Config` command in VS Code's command palette.

```json
{
  "mcpServers": {
    "chargebee": {
      "command": "npx",
      "args": [
          "-y",
          "@chargebee/mcp"
      ]
    }
  }
}
```

### VS Code

Install the Chargebee MCP server in VS Code using one of these buttons:

[<img alt="Install in VS Code Insiders" src="https://img.shields.io/badge/VS_Code_Insiders-VS_Code_Insiders?style=flat-square&label=Install%20Server&color=24bfa5">](https://insiders.vscode.dev/redirect?url=vscode%3Amcp%2Finstall%3F%257B%2522name%2522%253A%2522Chargebee%2520MCP%2522%252C%2522command%2522%253A%2522npx%2522%252C%2522args%2522%253A%255B%2522-y%2522%252C%2522%2540chargebee%252Fmcp%2522%255D%257D)

Alternatively, you can install the Chargebee MCP server using the VS Code CLI:

```bash
# For VS Code
code --add-mcp '{"name":"chargebee-mcp","command":"npx","args":["-y","@chargebee/mcp"]}'
```

```bash
# For VS Code Insiders
code-insiders --add-mcp '{"name":"chargebee-mcp","command":"npx","args":["-y","@chargebee/mcp"]}'
```

After installation, the Chargebee MCP server will be available for use with your GitHub Copilot agent in VS Code.


### Claude

Add the following to your `claude_desktop_config.json` file. See the [Claude Desktop documentation](https://modelcontextprotocol.io/quickstart/user) for more details.

```json
{
  "mcpServers": {
    "chargebee": {
      "command": "npx",
      "args": [
          "-y",
          "@chargebee/mcp"
      ]
    }
  }
}
```


### CLI

You can also run it as CLI by running the following command.

```sh
npx -y @chargebee/mcp@latest
```


## Contribution

To contribute to this project, please see the [contribution guide](CONTRIBUTING.md).

## License

[MIT](https://github.com/chargebee/agentkit/blob/main/LICENSE)
