import { Parser, Grammar } from 'nearley';
import compiledGrammar from './grammar';

const grammar = Grammar.fromCompiled(compiledGrammar);

/**
 * Parse a string as commit and return the result.
 *
 * @param  {string} text
 * @return {object}
 */
export function parseString(text: string) {
	const { results } = new Parser(grammar).feed(preprocess(text));

	if (results.length <= 1) {
		return results[0];
	}

	const relevant = postprocess(results);

	if (relevant) {
		return relevant;
	}

	throw new MultipleResults(text, results);
};

function preprocess(text: string) {
	return text
		.replace(/(\r\n|\n\r)/g, '\n') // replace CRLF to LF
		.trim(); // remove outer trailing spaces or newlines
}

function postprocess(results: any[]) {
	// context issue #1 - references in header subjects matches the subject signature, but a not the other way around
	// try matching the ASTs with a header subject children/reference score

	// no solution... not in combination with other scores, its basically gambling...

	// context issue #2 - footers are also matching body signature, but not the other way around
	// try matching the ASTs with a footer score to determine the most probable AST to return
	const footerScore = results
		.map(ast => ({ ast, score: ast.children.filter(token => token.type === 'footer').length }))
		.sort((a, z) => z.score - a.score);

	if (footerScore[0].score > 0) {
		return footerScore[0].ast;
	}
}

class MultipleResults extends Error {
	constructor(public text: string, public results: any[]) {
		super(`Found ${results.length} outcomes for: ${text}`)
	};
}
