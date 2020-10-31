import { readFileSync } from 'fs';
import { resolve } from 'path';
import { round } from 'lodash';
import test from 'ava';
import parse from 'csv-parse/lib/sync';
import { parseString } from '../..';

const load = (type) => {
	const file = resolve(__dirname, `commits-${type}.csv`);
	const opts = {
		columns: true,
		skip_empty_lines: true
	};

	return parse(readFileSync(file, 'utf8'), opts);
};

const run = (data) => {
	let passed = 0;
	let failed = 0;

	for (let commit of data) {
		const body = JSON.parse(commit.body);

		try {
			// todo: parse full commit instead of header once grammar is able to
			parseString(body.split('\n')[0])
			passed += 1;
		} catch (error) {
			failed += 1;
		}
	}

	return {
		passed,
		failed,
		rate: round((passed / data.length) * 100, 1),
	};
};

const debug = (info) => {
	console.log(`#${info.commits} ${info.type} commits: ✓ #${info.passed} - 𐄂 #${info.failed} (${info.rate}%)`);
};

test('conventional commits data', t => {
	const data = load('conventional');
	const info = run(data);

	debug({
		...info,
		type: 'conventional',
		commits: data.length,
	});

	t.true(info.passed > info.failed);
});

test('ignored commits data', t => {
	const data = load('ignored');
	const info = run(data);

	debug({
		...info,
		type: 'ignored',
		commits: data.length,
	});

	t.true(info.passed > info.failed);
});

test('unknown commits data', t => {
	const data = load('unknown');
	const info = run(data);

	debug({
		...info,
		type: 'unknown',
		commits: data.length,
	});

	t.true(info.passed > info.failed);
});
