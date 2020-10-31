// fix(cli): this is a normal fix commit (#123)
const example1 = {
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
const example2 = {
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
// * improve https certs docs
//
// * typo
//
// * local https: add mkcert -install step
//
// Co-authored-by: slorber <lorber.sebastien@gmail.com>
const example3 = {
	type: 'commit',
	children: [
		{
			type: 'header',
			children: [
				{ type: 'type', value: 'feat' },
				{ type: 'scope', value: 'v2' },
				{ type: 'subject', value: 'add support for key,cert in https' },
				{ type: 'reference', value: '3594' },
			],
		},
		// TBD, one of these options:
		{
			type: 'body',
			children: [
				{ type: 'text', value: '* fix: add support for key,cert in https' },
				{ type: 'text', value: '* docs: add steps for using https with docusaurus' },
				{ type: 'text', value: '* improve https certs docs' },
				{ type: 'text', value: '* typo' },
				{ type: 'text', value: '* local https: add mkcert -install step' },
			],
		},
		// or this one
		{ type: 'body', value: '* fix: add support for key,cert in https' },
		{ type: 'body', value: '* docs: add steps for using https with docusaurus' },
		{ type: 'body', value: '* improve https certs docs' },
		{ type: 'body', value: '* typo' },
		{ type: 'body', value: '* local https: add mkcert -install step' },
		{
			type: 'footer',
			children: [
				{ type: 'token', value: 'Co-authored-by' },
				{ type: 'text', value: 'slorber <lorber.sebastien@gmail.com>' },
			],
		},
	],
};
