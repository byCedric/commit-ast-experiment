// CAST - Commit Abstract Syntax Tree
// based on conventional commits
// should adhere to unist (universal syntax tree) v2.0.0

import { Literal, Parent } from 'unist';

/**
 * A commit represents the root of the AST.
 * It contains all main nodes within the commit.
 */
export interface Commit extends Parent {
	type: 'commit';
	children: (Header | Body | Footer | Text)[];
}

/**
 * Commit headers refer to the conventional commits header type.
 * It holds the most important informaiton of a single commit.
 * May contain nodes like type, scope, subject, references, flags, and/or text.
 */
export interface Header extends Parent {
	type: 'header';
	children: (HeaderType | HeaderScope | HeaderSubject | Breaking | Reference | Flag | Mention | Text)[];
}

/**
 * Header type is a special string containing the intent of the commit.
 * This is only defined if the commit is a conventional commit.
 */
export interface HeaderType extends Literal {
	type: 'type';
	value: string;
}

/**
 * Header scope is a special string containing the intent of the commit.
 * This is only defined if the commit is a conventional commit.
 */
export interface HeaderScope extends Literal {
	type: 'scope';
	value: string;
}

/**
 * Header subject is a special string containging the subject of the commit.
 * This is only defined if the commit is a conventional commit.
 *   - it MUST NOT contain optional references or flags
 */
export interface HeaderSubject extends Literal {
	type: 'subject';
	value: string;
}

/**
 * Body contains a single line of text.
 * It may hold textual information and/or references within that text.
 */
export interface Body extends Parent {
	type: 'body';
	children: (Text | Reference | Mention)[];
}

/**
 * Footer contains special actions from a line of text.
 * This can refer to actionable items with their value, like:
 *   - Co-authored-by: author <e@mail.com>
 *   - Fixes #123
 */
export interface Footer extends Parent {
	type: 'footer',
	children: (FooterAction | Breaking | Reference | Mention | Text)[];
}

/**
 * Footer actions are the key from the footer's key/value pairs.
 * It's often considered, or has been considered, actionable items.
 */
export interface FooterAction extends Literal {
	type: 'action';
	value: string;
}

/**
 * Breaking nodes are a special type of node that may mark commits as breaking.
 * This node contains the value with what this was makred as breaking, e.g. `!` or `BREAKING CHANGE`.
 */
export interface Breaking extends Literal {
	type: 'breaking';
	value: string;
}

/**
 * A reference is the part of the commit that may reference external entities.
 * This could be a pull request, commit hash, or ticket id.
 *   - it MUST start with an hash `#` and may not contain any whitespace
 *   - it MAY be wrapped in parenthesis `(#<reference>)`
 */
export interface Reference extends Literal {
	type: 'reference';
	value: string;
}

/**
 * A flag is part of the commit that acts as a flag or label.
 * This chould mark special behavior for the commit, like `skip-ci`.
 *   - it MUST be wrapped in brackets `[<flag>]`
 */
export interface Flag extends Literal {
	type: 'flag';
	value: string;
}

/**
 * A mention is a reference to a user-like entity.
 * This could be a co-maintainer or organization.
 *   - it MUST start with an at `@` and may not contain any whitespace
 */
export interface Mention extends Literal {
	type: 'mention',
	value: string;
}

/**
 * Text is anything that's just considered text.
 * It's used by some nodes as children, like body.
 */
export interface Text extends Literal {
	type: 'text';
	value: string;
}

/** All available types of the nodes */
export type Types = Nodes['type'];
/** All available node types */
export type Nodes =
	| Commit
	| Header
	| HeaderType
	| HeaderScope
	| HeaderSubject
	| Body
	| Footer
	| FooterAction
	| Breaking
	| Reference
	| Flag
	| Mention
	| Text
;
