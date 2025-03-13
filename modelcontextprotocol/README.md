# Chargebee Model Context Protocol (MCP) Server

## Overview

Model Context Protocol (MCP) is a new, [standardized protocol](https://modelcontextprotocol.io/introduction) for managing context between large language models (LLMs) and external systems. In this package, we provide an installer as well as an MCP Server for [Chargebee](https://chargebee.com).

This enables AI agents to generate integration code and answer your product queries using natural language in tools like Cursor IDE, Claude Desktop, or any MCP client.

eg queries:

- `How to setup usage based billing in Chargebee?`
- `What are the different pricing models supported by Chargebee?`
- `Generate code to create a trial subscription in Chargebee?`

## Prerequisites

- [Node.js LTS](https://nodejs.org/en/download/) - The Chargebee MCP server requires Node.js LTS version to run properly.

## Setup

To run the Chargebee MCP server using [Node.js npx](https://docs.npmjs.com/cli/v10/commands/npx), use the following command:

```
# To set up all available tools
npx -y @chargebee/mcp@latest
```

## Available Tools

| Tool                             | Description                      |
| -------------------------------- | -------------------------------- |
| `chargebee_documentation_search` | Search Chargebee's documentation |

## Using with Cursor

**Installation - Globally**

Run the MCP server using npx:

```bash
npx -y @chargebee/mcp@latest
```

In your Cursor IDE

1. Go to `Cursor Settings` > `MCP`
2. Click `+ Add New MCP Server`
3. Fill in the form:
   - Name: `Chargebee MCP` (or any name you prefer)
   - Type: `command`
   - Command: `npx -y @chargebee/mcp@latest`

**Installation - Project-specific**

Add an `.cursor/mcp.json` file to your project:

```json
{
	"mcpServers": {
		"chargebee": {
			"command": "npx",
			"args": ["-y", "@chargebee/mcp@latest"]
		}
	}
}
```

**Usage**

Once configured, the chargebee tools will be automatically available to the Cursor AI Agent. You can:

1. The tool will be listed under `Available Tools` in MCP settings
2. Agent will automatically use it when relevant
3. You can explicitly ask Agent to send notifications

## Using with Roo Code

Access the MCP settings by clicking "Edit MCP Settings" in Roo Code settings or using the "Roo Code: Open MCP Config" command in VS Code's command palette.

```json
{
	"mcpServers": {
		"chargebee": {
			"command": "npx",
			"args": ["-y", "@chargebee/mcp@latest"]
		}
	}
}
```

3. The chargebee capabilities will be available to Roo Code's AI agents

## Contribution

To contribute to this project, please see the [contribution guide](CONTRIBUTING.md).

## Telemetry

The Chargebee MCP server collects anonymous usage data to help improve the product. This data includes:

- Server startup and shutdown events
- Tool usage statistics
- Error information
- Session duration

### Disabling Telemetry

You can disable telemetry by setting the `CHARGEBEE_TELEMETRY_DISABLED` environment variable to `1`:

```bash
export CHARGEBEE_TELEMETRY_DISABLED=1
```

## License

[MIT](https://github.com/chargebee/agentkit/blob/develop/LICENSE)
