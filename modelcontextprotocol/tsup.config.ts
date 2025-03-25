import { defineConfig } from 'tsup';
import dotenv from 'dotenv';
import fs from 'fs';

// Read version from package.json
const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
const version = packageJson.version;

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
	minify: false,
	external: [],
	onSuccess: async () => {
		console.log('Build succeeded!');
	},
	banner: {
		js: `/*\n * MCP Server ${version} - Copyright (c) 2011-2025 Chargebee, Inc.\n */\n\n`,
	},
	env: dotenv.config({
		path:
			process.env.NODE_ENV === 'development'
				? '.env.development'
				: '.env.production',
	}).parsed,
});
