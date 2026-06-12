// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://docs.luckeysystems.com',
	integrations: [
		starlight({
			title: 'Athena Docs',
			description:
				'Documentation for the Athena ecosystem by LuckeySystems: Athena Desktop, Athena Code, Athena Mobile, and Athena Whisper.',
			social: [
				{
					icon: 'github',
					label: 'GitHub',
					href: 'https://github.com/luckeyfaraday',
				},
			],
			sidebar: [
				{
					label: 'Start Here',
					items: [
						{ label: 'What is Athena?', slug: 'start-here/what-is-athena' },
						{ label: 'The Ecosystem', slug: 'start-here/ecosystem' },
					],
				},
				{
					label: 'Athena Desktop',
					items: [
						{ label: 'Overview', slug: 'athena-desktop/overview' },
						{ label: 'Getting Started', slug: 'athena-desktop/getting-started' },
						{ label: 'Sessions & Handoffs', slug: 'athena-desktop/sessions-and-handoffs' },
						{ label: 'Hermes & the MCP Bridge', slug: 'athena-desktop/hermes-mcp-bridge' },
						{ label: 'Troubleshooting', slug: 'athena-desktop/troubleshooting' },
					],
				},
				{
					label: 'Athena Code',
					items: [
						{ label: 'Overview', slug: 'athena-code/overview' },
						{ label: 'Installation', slug: 'athena-code/installation' },
						{ label: 'Usage', slug: 'athena-code/usage' },
						{ label: 'Memory & Recall', slug: 'athena-code/memory' },
					],
				},
				{
					label: 'Athena Mobile',
					items: [
						{ label: 'Overview', slug: 'athena-mobile/overview' },
						{ label: 'Setup & Deployment', slug: 'athena-mobile/setup' },
					],
				},
				{
					label: 'Athena Whisper',
					items: [
						{ label: 'Overview', slug: 'athena-whisper/overview' },
						{ label: 'Installation', slug: 'athena-whisper/installation' },
						{ label: 'Configuration', slug: 'athena-whisper/configuration' },
					],
				},
			],
		}),
	],
});
