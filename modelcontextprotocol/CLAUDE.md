# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Model Context Protocol (MCP) Server** for Chargebee - a billing platform integration tool. The project provides an MCP server that exposes Chargebee's documentation search and code generation capabilities to AI-powered code editors and tools.

## Development Commands

### Build and Development
- `npm run build` - Build the project for production (uses tsup with cross-env NODE_ENV=production)
- `npm run dev` - Start development mode with file watching (uses tsup --watch)
- `npm run check` - Type check without emitting files (uses tsc --noEmit)
- `npm run prepublish` - Runs build before publishing

### Testing
- **No test commands are configured** - Add test scripts to package.json if needed

### Running the Server
- `npx @chargebee/mcp` - Run the published server
- `npm run dev` - Run in development mode with file watching

## Architecture

### Core Components

1. **Entry Point** (`src/index.ts`): 
   - CLI application using Commander.js
   - Initializes ChargebeeMCPServer and StdioServerTransport
   - Handles process signals for graceful shutdown

2. **MCP Server** (`src/mcp.ts`):
   - `ChargebeeMCPServer` class extends `McpServer` from MCP SDK
   - Registers tools dynamically from the tools directory
   - Handles tool execution and error formatting
   - Manages session IDs and user agent headers

3. **Tools System** (`src/tools/`):
   - **Documentation Search** (`documentation-search.ts`): Searches Chargebee documentation
   - **Code Planner** (`code-planner.ts`): Generates integration code and workflows
   - Tools are registered via `src/tools/index.ts`

4. **Chargebee AI Client** (`src/chargebee-ai-client/`):
   - Handles API communication with Chargebee's AI services
   - Manages authentication and request headers

### Key Patterns

- **Tool Registration**: Tools follow a consistent pattern with `method`, `description`, `parameters` (Zod schema), and `execute` function
- **Error Handling**: Centralized error handling in MCP server with JSON-formatted responses
- **Path Aliases**: Uses `@/*` for `src/*` imports (configured in tsconfig.json)
- **TypeScript**: Full TypeScript with strict mode enabled

### Build System

- **tsup** for bundling with TypeScript support
- **cross-env** for cross-platform environment variables
- **Post-build**: Makes dist files executable with `shx chmod +x dist/*.js`
- **Node.js**: Requires Node.js 18+ (ESM modules)

## Supported Programming Languages

The tools support code generation and documentation for:
- Node.js, Python, Java, Go, Ruby, PHP, .NET, cURL

## Development Notes

- The server runs on stdio transport for MCP communication
- Uses Zod for parameter validation
- Implements proper session management with UUID generation
- Includes user agent tracking for analytics