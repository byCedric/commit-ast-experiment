export interface TokenLocation {
	line: number;
	column: number;
	offset: number;
}

export interface Token<T extends string> {
	type: T;
	start: TokenLocation;
	end?: TokenLocation;
}

export interface CommitToken extends Token<'commit'> {

}

const abc: CommitToken = {
	type: 'commit',
	start: { line: 1, column: 0, offset: 0 },
};
