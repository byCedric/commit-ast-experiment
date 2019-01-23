import { Parser, Grammar } from 'nearley';
import grammar from './grammar.js'; // refer the compiled grammar

/**
 * Parse a string as commit and return the result.
 *
 * @param  {string} text
 * @return {object}
 */
export function parseString(text) {
	const parser = new Parser(Grammar.fromCompiled(grammar));

	parser.feed(text);

	return parser.results[0];
};
