import { Commit } from './types';

// fix(cli): this is a normal fix commit (#123)
const example1: Commit = {
	type: 'commit',
	children: [
		{
			type: 'header',
			children: [
				{ type: 'text', value: 'fix(cli): this is a normal fix commit (#123)' },
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
				{ type: 'text', value: 'feat(app)!: this new feature breaks something [skip-ci]' },
				{ type: 'type', value: 'feat' },
				{ type: 'scope', value: 'app' },
				{ type: 'breaking', value: '!' },
				{ type: 'subject', value: 'this new feature breaks something' },
				{ type: 'flag', value: 'skip-ci' },
			],
		},
	],
};

// based on: https://github.com/facebook/docusaurus/commit/92884431d1d4ad0685334d04cf51c6f8019215f4
// feat(v2): add support for key,cert in https (#3594)
//
// This adds a certain feature @someone requested.
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
		{
			type: 'header',
			children: [
				{ type: 'text', value: 'feat(v2): add support for key,cert in https (#3594)' },
				{ type: 'type', value: 'feat' },
				{ type: 'scope', value: 'v2' },
				{ type: 'subject', value: 'add support for key,cert in https' },
				{ type: 'reference', value: '3594' },
			],
		},
		{
			type: 'body',
			children: [
				{ type: 'text', value: 'This adds a certain feature @someone requested.' },
				{ type: 'mention', value: 'someone' },
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
				{ type: 'text', value: 'Fixes #123' },
				{ type: 'action', value: 'Fixes' },
				{ type: 'reference', value: '123' },
			],
		},
		{
			type: 'footer',
			children: [
				{ type: 'text', value: 'Co-authored-by: slorber <lorber.sebastien@gmail.com>' },
				{ type: 'action', value: 'Co-authored-by' },
				{ type: 'text', value: 'slorber <lorber.sebastien@gmail.com>' },
			],
		},
	],
};

// see: https://github.com/vuejs/vue/commit/0664cb01434f3d52efd076b6aafe54066a2a762a
// fix(v-pre): do not alter attributes (#10088)
//
// * fix(v-pre): do not alter attributes
//
// close #10087
//
// * fix(v-pre): do not alter attributes
//
// remove component and replace option from unit test
//
// * refactor: use or
//
// * perf: check boolean before index
//
// Co-authored-by: Eduardo San Martin Morote <posva@users.noreply.github.com>
const example4: Commit = {
	type: 'commit',
	children: [
		{
			type: 'header',
			children: [
				{ type: 'text', value: 'fix(v-pre): do not alter attributes (#10088)' },
				{ type: 'type', value: 'fix' },
				{ type: 'scope', value: 'v-pre' },
				{ type: 'subject', value: 'do not alter attributes' },
				{ type: 'reference', value: '10088' },
			],
		},
		{ type: 'body', children: [{ type: 'text', value: '* fix(v-pre): do not alter attributes' }] },
		{
			type: 'footer',
			children: [
				{ type: 'action', value: 'close' },
				{ type: 'reference', value: '10087' },
			],
		},
		{ type: 'body', children: [{ type: 'text', value: '* fix(v-pre): do not alter attributes' }] },
		{ type: 'body', children: [{ type: 'text', value: 'remove component and replace option from unit test' }] },
		{ type: 'body', children: [{ type: 'text', value: '* refactor: use or' }] },
		{ type: 'body', children: [{ type: 'text', value: '* perf: check boolean before index' }] },
		{
			type: 'footer',
			children: [
				{ type: 'action', value: 'Co-authored-by' },
				{ type: 'text', value: 'Eduardo San Martin Morote <posva@users.noreply.github.com>' },
			],
		},
	],
};

// see: https://github.com/vuejs/vue/commit/46ae9525964ea475dc927031e165c2b209396ac8
// chore: update sponsors [ci skip] (#11570)
const example5: Commit = {
	type: 'commit',
	children: [
		{
			type: 'header',
			children: [
				{ type: 'text', value: 'chore: update sponsors [ci skip] (#11570)' },
				{ type: 'type', value: 'chore' },
				{ type: 'subject', value: 'update sponsors' },
				{ type: 'flag', value: 'ci skip' },
				{ type: 'reference', value: '#11570' },
			],
		},
	],
};

// see: https://github.com/996icu/996.ICU/commit/8aa771f0ff62b2382c6020b8adf9600bd9747e84
// Merge branch 'master' into master
const example6: Commit = {
	type: 'commit',
	children: [
		{ type: 'header', children: [{ type: 'text', value: 'Merge branch \'master\' into master' }] },
	],
};

// see: https://github.com/996icu/996.ICU/commit/ed0f2918900a4c3c48a24ee9f74ccb474570ffb8
// Merge pull request #25923 from yinzhipeng123/master
//
// 北京上市公司 东方国信
const example7: Commit = {
	type: 'commit',
	children: [
		{
			type: 'header',
			children: [
				{ type: 'text', value: 'Merge pull request #25923 from yinzhipeng123/master' },
				{ type: 'reference', value: '25923' },
			],
		},
		{ type: 'body', children: [{ type: 'text', value: '北京上市公司 东方国信' }] },
	],
};

// see: https://github.com/expo/expo/commit/93b7c965fcff1f668cc6b40fd07f499e0efaf09e
// [expotools] Move ios-shell-app task to expotools (#9965)
//
// # Why
//
// Migrating tools to `expotools` 👍
//
// # How
//
// Added a new command file to `expotools` — `IosShellApp`. Copied the code from `tools-public` responsible for creating iOS shell apps. To create the options set I had to dive deep into `xdl` and infer args from there.
//
// # Test Plan
//
// I can't test it properly before SDK39 drops — right now kernel expects `expo-updates` to be present in the standalone app and `xdl` thinks the app we're building is still on SDK38 (`exponent-view-template/…/Supporting/EXSDKVersions.plist` renders `38.0.0` as _latest_).
//
// At least the build steps run, see [build](https://github.com/expo/expo/runs/1040914498).
const example8: Commit = {
	type: 'commit',
	children: [
		{
			type: 'header',
			children: [
				{ type: 'text', value: '[expotools] Move ios-shell-app task to expotools (#9965)' },
				{ type: 'flag', value: 'expotools' },
				{ type: 'reference', value: '9965' },
			],
		},
		{ type: 'body', children: [{ type: 'text', value: '# Why' }] },
		{ type: 'body', children: [{ type: 'text', value: 'Migrating tools to `expotools` 👍' }] },
		{ type: 'body', children: [{ type: 'text', value: '# How' }] },
		{ type: 'body', children: [{ type: 'text', value: 'Added a new command file to `expotools` — `IosShellApp`. Copied the code from `tools-public` responsible for creating iOS shell apps. To create the options set I had to dive deep into `xdl` and infer args from there.' }] },
		{ type: 'body', children: [{ type: 'text', value: '# Test Plan' }] },
		{ type: 'body', children: [{ type: 'text', value: 'I can\'t test it properly before SDK39 drops — right now kernel expects `expo-updates` to be present in the standalone app and `xdl` thinks the app we\'re building is still on SDK38 (`exponent-view-template/…/Supporting/EXSDKVersions.plist` renders `38.0.0` as _latest_).' }] },
		{ type: 'body', children: [{ type: 'text', value: 'At least the build steps run, see [build](https://github.com/expo/expo/runs/1040914498).' }] },
	],
};

// see: https://github.com/expo/expo/commit/d8f25213ed84725c3f492a9fe4d4db2a628a1e45
// [notifications][android] fix notification categories in standalone apps (#10624)
//
// * fix notification categories in standalone apps
//
// * Update CHANGELOG.md
const example9: Commit = {
	type: 'commit',
	children: [
		{
			type: 'header',
			children: [
				{ type: 'text', value: '[notifications][android] fix notification categories in standalone apps (#10624)' },
				{ type: 'flag', value: 'notifications' },
				{ type: 'flag', value: 'android' },
				{ type: 'reference', value: '10624' },
			],
		},
		{ type: 'body', children: [{ type: 'text', value: '* fix notification categories in standalone apps' }] },
		{ type: 'body', children: [{ type: 'text', value: '* Update CHANGELOG.md' }] },
	],
};
