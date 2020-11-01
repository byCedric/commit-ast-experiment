@{%
	const lexer = require('moo').compile({
		line: { match: /\n/, lineBreaks: true },
		space: /[ \t\v\f]/,
		char: /./,
	});
%}

@lexer lexer

CommitLine
	-> Header {% id %}
	|  Footer {% id %}
	|  Body   {% id %}

Header
	-> HeaderType _s HeaderScope:? _s HeaderBreaking:? _s ":" __s HeaderSubject (__s Reference):*
	{% parent('header', data => [data[0], data[2], data[4], data[8], ...data[9].map(ref => ref[1])].filter(Boolean)) %}

HeaderType
	-> word {% literal('type', pick(0)) %}

HeaderScope
	-> "(" word ")" {% literal('scope', pick(1)) %}

HeaderSubject
	-> sentence {% literal('subject', pick(0)) %}

HeaderBreaking
	-> "!" {% literal('breaking', () => '!') %}

Body
	-> BodyText {% parent('body') %}
	|  Body %line BodyText {% parent('body', data => data[0].children.concat(data[2])) %}

BodyText
	-> sentence {% literal('text', pick(0)) %}

Footer
	-> FooterAction ":" __s FooterText {% parent('footer', data => [data[0], data[3]]) %}
	|  FooterAction __s Reference {% parent('footer', data => [data[0], data[2]]) %}

FooterAction
	-> word                {% literal('action', pick(0)) %}
	|  "breaking change"i  {% literal('breaking', () => '!') %}
	|  "breaking changes"i {% literal('breaking', () => '!') %}

FooterText -> sentence {% literal('text', pick(0)) %}

# TODO - implement in header
# TODO - implement in footer
# TODO - add flags to header
References
	-> Reference
	|  References __s Reference {% data => data[0].concat(data[2]) %}

Reference
	-> "#" word {% literal('reference', pick(1)) %}
	|  "(" "#" word ")" {% literal('reference', pick(2)) %}

Flag
	-> "[" word "]" {% literal('flag', pick(1)) %}

### Primitives ###

_n -> %line:* {% nuller %}
__n -> %line:+ {% nuller %}

_s -> %space:* {% nuller %}
__s -> %space:+ {% nuller %}

char -> %char {% id %}
word -> %char:+ {% join(0) %}
sentence
	-> word {% id %}
	|  sentence __s word {% data => data[0] + ' ' + data[2] %}

@{%
	const nuller = () => null;

	function literal(type, transform = null) {
		return (data, location) => ({ type, value: transform ? transform(data) : data });
	}

	function parent(type, transform = null) {
		return (data, location) => ({ type, children: transform ? transform(data) : data });
	}

	function pick(index) {
		return data => data[index];
	}

	function join(index) {
		return data => data[index].join('');
	}

	function array(transform) {
		return args => [transform(...args)];
	}
%}
