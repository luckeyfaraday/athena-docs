// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://docs.luckeysystems.com',
	integrations: [
		starlight({
			title: 'Athena',
			description:
				'Documentation for the Athena ecosystem by LuckeySystems: Athena Desktop, Athena Code, Athena Mobile, and Athena Whisper.',
			logo: {
				light: './src/assets/athena-mark-ink.svg',
				dark: './src/assets/athena-mark-cream.svg',
				alt: 'Athena mark',
			},
			favicon: '/favicon.png',
			customCss: ['./src/styles/custom.css'],
			head: [
				{
					tag: 'link',
					attrs: { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
				},
				{
					tag: 'link',
					attrs: {
						rel: 'preconnect',
						href: 'https://fonts.gstatic.com',
						crossorigin: true,
					},
				},
				{
					tag: 'link',
					attrs: {
						rel: 'stylesheet',
						href: 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300..800&family=IBM+Plex+Mono:ital,wght@0,400;0,500;1,400&family=Silkscreen:wght@400;700&display=swap',
					},
				},
			],
			expressiveCode: {
				styleOverrides: {
					borderRadius: '0',
					borderWidth: '1.5px',
					uiFontFamily: "'Silkscreen', monospace",
					codeFontFamily: "'IBM Plex Mono', ui-monospace, monospace",
				},
			},
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
