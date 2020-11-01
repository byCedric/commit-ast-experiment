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
	const segments = preprocess(text);

	if (!segments.length) {
		return null;
	}

	const nodes = segments.map((segment, index) => {
		const results = new Parser(grammar).feed(segment).finish();
		return postprocess(segment, index, results);
	});

	return {
		type: 'commit',
		children: nodes,
	};

	// if (results.length <= 1) {
	// 	return results[0];
	// }

	// const relevant = postprocess(results);

	// if (relevant) {
	// 	return relevant;
	// }

	// throw new MultipleResults(text, results);
};

/**
 * Process the text and return the text in segments back.
 * Every segment is handled and parsed as a commit line.
 */
function preprocess(text: string) {
	return text
		.replace(/(\r\n|\n\r)/g, '\n') // replace CRLF to LF
		.split('\n\n'); // split it up by commit separator
}

function postprocess(segment: string, index: number, results: any[]) {
	const order = index === 0
		? ['header', 'footer', 'body']
		: ['footer', 'body', '', '', 'header'];

	if (!results.length) {
		return null;
	}

	// sort results by type, in order of header - footer - body
	// when either one of these types is found in that order,
	// it's highly likely that the commit line is this type
	const type = results
		.sort((a, z) => order.indexOf(a.type) - order.indexOf(z.type))
		[0].type;

	// console.log('postprocess - type', type);

	// now find the component with the most children,
	// this is the best we can match it on for now
	const component = results
		.filter(node => node.type === type)
		.sort((a, z) => z.children.length - a.children.length)
		[0];

	if (component.children[0].type !== 'text') {
		component.children.unshift({ type: 'text', value: segment });
	}

	return component;
}
