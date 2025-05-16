<p align="center">
  <img src="https://github.com/chargebee/agentkit/blob/main/media/cb-logo.png?raw=true" alt="Chargebee Icon" width="100" height="100">
</p>

# Chargebee AgentKit

Seamlessly add Chargebee to your AI Agents using AgentKit for smarter billing and subscription workflows.

AgentKit is a toolkit that enhances AI applications like Claude, Cursor and other agentic AI applications with Chargebee capabilities. It enables users across different roles to integrate their solutions with Chargebee and manage simplifying billing and subscription management using AI.

### Packages

- **[MCP Server](modelcontextprotocol/README.md):** The Chargebee MCP Server provides a powerful set of tools to enhance developer productivity. It integrates with AI-powered code editors like Cursor, Windsurf, and Cline, as well as general-purpose tools such as Claude Desktop.

## Contribution

To contribute to this project, please see the [contribution guide](CONTRIBUTING.md).



## Running evals

The evals package loads an mcp client that then runs the index.ts file, so there is no need to rebuild between tests. You can load environment variables by prefixing the npx command. Full documentation can be found [here](https://www.mcpevals.io/docs).

```bash
OPENAI_API_KEY=your-key  npx mcp-eval evals.ts modelcontextprotocol/src/tools/code-planner.ts
```
## License

[MIT](LICENSE)
