import { defineConfig } from 'tsup';
import { version } from './package.json';

export default defineConfig({
	clean: true,
	dts: true,
	entry: ['src/index.ts'],
	format: ['esm'],
	sourcemap: true,
	target: 'esnext',
	outDir: 'dist',
	splitting: false,
	bundle: true,
	minify: true,
	external: [],
	onSuccess: async () => {
		console.log('Build succeeded!');
	},
	banner: {
		js: `/*\n * MCP Server ${version} - Copyright (c) 2011-2025 Chargebee, Inc.\n */\n\n`,
	},
	define: {
		BASE_URL: JSON.stringify('http://localhost:3001'), // process.env.BASE_URL ||  https://agentkit.ai.localcblabs.com
	},
});
