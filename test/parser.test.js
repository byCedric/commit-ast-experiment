import test from 'ava';
import { parseString } from '../lib/parser';

test('#parseString parses simple commit', t => {
	const string = 'feat: allow provided config object to extend other configs';
	const parsed = parseString(string);

	t.truthy(parsed);
});
