import test from 'ava';
import util from 'util';
import { parseString } from '..';

// test('#parseString parses simple commit', t => {
// 	const string = 'feat: allow provided config object to extend other configs';
// 	const parsed = parseString(string);

// 	console.log(parsed);

// 	t.truthy(parsed);
// });

const header = (start, end) => `--- Example (${end - start}ms) ---\n`
const content = example => example + '\n';
const format = ast => util.inspect(ast, false, 6);

test('#parseString parses a set of example commits', t => {
	const examples = [
		'feat: this is a new feature',
		'fix(cli): this is fixed in the cli now',
		'refactor!: changes the implementation, but is also breaking',
		'refactor: this is the first commit\nchore(cli)!: this is another',
		'feature: this is a simple commit with reference #123',
		'feature: this is a commit with wrapped reference (#123)',
		'fix: multiple references #123 #456 (#abc-123)',
		'docs(cli): add notion about cli (#123)\r\n\r\nFixes #123 #456',
		'feat(v2): add support for key,cert in https (#3594)\n\nCo-authored-by : slorber <lorber.sebastien@gmail.com>',
		'feat(v2): add support for key,cert in https (#3594)\n\n* fix: add support for key,cert in https\r\n\r\n* docs: add steps for using https with docusaurus\r\n\r\n* improve https certs docs\r\n\r\n* typo\r\n\r\n* local https: add mkcert -install step\r\n\r\nCo-authored-by: slorber <lorber.sebastien@gmail.com>',
		'docs(cli): add notion about cli (#123)\r\n\r\nWhats up bitches?',
	];

	try {
		for (const example of examples) {
			const start = Date.now();
			const ast = parseString(example);
			const end = Date.now();

			console.log(header(start, end) + content(example) + format(ast));
		}
	} catch (error) {
		if (!error.results) throw error;
		console.log(header(0, 1) + content(error.text));
		console.log('Multiple results found:');
		console.log(error.results.map(format));
	} finally {
		t.truthy(true);
	}
});

test('#parseString performance', t => {
	const runs = 10000;
	const start = Date.now();

	for (let i = 0; i < runs; i++) {
		parseString('feature: this is a simple commit');
	}

	const end = Date.now();
	console.log('Finished in', end - start, 'ms.', 'Resulting in an average of', (end - start) / runs, 'ms');
	t.truthy(true);
});
