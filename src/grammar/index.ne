Commit
	-> Headers (NewLines Body):? (NewLines Footer):?
	{% data => ({
		type: 'commit',
		children: []
			.concat(data[0])
			.concat(data[1] ? data[1][1] : [])
			.concat(data[2] ? data[2][1] : []),
	}) %}

### HEADER ###

# Multiple commit headers may be provided, separated by (at least) 1 new line
Headers
  -> Header
	|  Headers nlchar Header {% data => data[0].concat(data[2]) %}

# Commit headers contains the most important structure of data
# <type>(scope)?<!>?: <subject>
# TODO: find out if we can add optional spaces between these two, it results in multiple results but is it safe to return the first?
#   > HeaderType _ HeaderScope:? _ HeaderBreaking:? _ HeaderDelimiter __ HeaderSubject
Header ->
	HeaderType HeaderScope:? HeaderBreaking:? HeaderDelimiter __ HeaderSubject
	{% data => ({ type: 'header', children: data.filter(Boolean) }) %}

# Commit types define the type of change made, e.g. fix/feat/chore.
# It can contain all characters, except:
#  - delimiter `:`, that's the end of the type
#  - left parenthesis `(`, it's the start of the scope
#  - exclamation mark `!`, marks a commit as breaking
#  - whitespace ` `, not allowed according to the spec
HeaderType -> [^:(! ]:+ {% data => ({ type: 'type', value: data[0].join('') }) %}

# Commit scopes define what area the commit touches, wrapped in parentheses.
# It matches everything, except the closing parenthesis.
HeaderScope -> "(" [^)]:+ ")" {% data => ({ type: 'scope', value: data[1].join('') }) %}

# Commits may be marked as breaking using the short notation.
# This is an exclamation mark right before the delimiter.
HeaderBreaking -> "!" {% data => ({ type: 'breaking' }) %}

# Commit types/scopes/breaking MUST end right after the colon delimiter.
HeaderDelimiter -> ":" {% () => null %}

# Commit subject is everything on the same line, after the other header items
# TODO: find out if we can parse flags or references in subjects
#   > # -> [^#]:+ __ References {% data => ({ type: 'subject', value: data[0].join(''), children: data[2] }) %}
HeaderSubject -> [^\n]:+ {% data => ({ type: 'subject', value: data[0].join('') }) %}

### BODY ###

Body
	-> BodyLine {% data => ({ type: 'body', children: [data[0]] }) %}
	|  Body __n BodyLine {% data => ({ type: 'body', children: data[0].children.concat(data[2]) }) %}

BodyLine
	-> [^\n]:+ {% data => ({ type: 'text', value: data[0].join('') }) %}

### FOOTER ###

Footer
	-> FooterLine
	|  Footer __n FooterLine {% data => data[0].concat(data[2]) %}

FooterLine
	-> FooterAction _s ":" __s FooterValue {% data => ({ type: 'footer', children: [data[0], data[4]] }) %}
	|  FooterAction __s References {% data => ({ type: 'footer', children: data[2].concat(data[0]) }) %}

# Action, or key, can by any char, except spaces
FooterAction -> [^: \n]:+ {% data => ({ type: 'action', value: data[0].join('') }) %}
# Value can by any char, except line endings
FooterValue -> [^\n]:+ {% data => ({ type: 'text', value: data[0].join('') }) %}

### MISC ###

References
	-> Reference
	|  References __s Reference {% data => data[0].concat(data[2]) %}

Reference
	-> "#" [^ )]:+ {% data => ({ type: 'reference', value: data[1].join('') }) %}
	|  "(" Reference ")" {% data => data[1] %}

NewLines -> nlchar nlchar {% () => null %}

### Primitives ###

_ -> wsnlchar:* {% () => null %}
__ -> wsnlchar:+ {% () => null %}
wsnlchar -> [ \t\n\v\f] {% id %}

_n -> nlchar:* {% () => null %}
__n -> nlchar:+ {% () => null %}
nlchar -> [\n] {% id %}

_s -> wschar:* {% () => null %}
__s -> wschar:+ {% () => null %}
wschar -> [ \t\v\f] {% id %}
