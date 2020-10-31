import { Commit } from './types';

// fix(cli): this is a normal fix commit (#123)
const example1: Commit = {
	type: 'commit',
	children: [
		{
			type: 'header',
			children: [
				{ type: 'type', value: 'fix' },
				{ type: 'scope', value: 'cli' },
				{ type: 'subject', value: 'this is a normal fix commit' },
				{ type: 'reference', value: '123' },
			],
		},
	],
};

// feat(app)!: this new feature breaks something [skip-ci]
const example2: Commit = {
	type: 'commit',
	children: [
		{
			type: 'header',
			children: [
				{ type: 'type', value: 'feat' },
				{ type: 'scope', value: 'app' },
				{ type: 'breaking', value: '!' },
				{ type: 'subject', value: 'this new feature breaks something' },
				{ type: 'flag', value: 'skip-ci' },
			],
		},
	],
};

// feat(v2): add support for key,cert in https (#3594)
//
// * fix: add support for key,cert in https
//
// * docs: add steps for using https with docusaurus
//
// * improve https certs docs (#987)
//
// * typo
//
// * local https: add mkcert -install step
//
// Fixes #123
// Co-authored-by: slorber <lorber.sebastien@gmail.com>
const example3: Commit = {
	type: 'commit',
	children: [
		// Not sure if we should add these "raw value"-text nodes?
		// {
		// 	type: 'text',
		// 	value: 'feat(v2): add support for key,cert in https (#3594)\n\n'
		// 		+ '* fix: add support for key,cert in https\n\r\n\r'
		// 		+ '* docs: add steps for using https with docusaurus\n\r\n\r'
		// 		+ '* improve https certs docs (#987)\n\r\n\r'
		// 		+ '* typo\n\r\n\r'
		// 		+ '* local https: add mkcert -install step\n\r\n\r'
		// 		+ 'Fixes #123\n\n'
		// 		+ 'Co-authored-by: slorber <lorber.sebastien@gmail.com>'
		// 	,
		// },
		{
			type: 'header',
			children: [
				// Not sure if we should add these "raw value"-text nodes?
				{ type: 'text', value: 'feat(v2): add support for key,cert in https (#3594)' },
				{ type: 'type', value: 'feat' },
				{ type: 'scope', value: 'v2' },
				{ type: 'subject', value: 'add support for key,cert in https' },
				{ type: 'reference', value: '3594' },
			],
		},
		{ type: 'body', children: [{ type: 'text', value: '* fix: add support for key,cert in https' }] },
		{ type: 'body', children: [{ type: 'text', value: '* docs: add steps for using https with docusaurus' }] },
		{
			type: 'body',
			children: [
				{ type: 'text', value: '* improve https certs docs (#987)' },
				{ type: 'reference', value: '987' },
			],
		},
		{ type: 'body', children: [{ type: 'text', value: '* typo' }] },
		{ type: 'body', children: [{ type: 'text', value: '* local https: add mkcert -install step' }] },
		{
			type: 'footer',
			children: [
				// Not sure if we should add these "raw value"-text nodes?
				{ type: 'text', value: 'Fixes #123' },
				{ type: 'action', value: 'Fixes' },
				{ type: 'reference', value: '123' },
			],
		},
		{
			type: 'footer',
			children: [
				// Not sure if we should add these "raw value"-text nodes?
				{ type: 'text', value: 'Co-authored-by: slorber <lorber.sebastien@gmail.com>' },
				{ type: 'action', value: 'Co-authored-by' },
				{ type: 'text', value: 'slorber <lorber.sebastien@gmail.com>' },
			],
		},
	],
};
