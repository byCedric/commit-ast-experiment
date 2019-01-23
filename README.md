# Commit Parser

[![Build Status](https://img.shields.io/travis/com/byCedric/Commit-Parser/develop.svg?style=flat-square)](https://travis-ci.com/byCedric/Commit-Parser)

Parsing conventional commits using nearley grammar.

## Getting started

Currently there are some scripts setup for development.

### Build

The build script compiles both the Nearley grammar and "wrapping" scripts.
It's separated into `build-babel` and `build-nearley`, both combined in `build`.

> The tests depend on built files, but isn't run automatically. Make sure you execute this before testing.

```bash
$ npm run build
$ npm run build-babel
$ npm run build-nearley
```

### Test

In this repository there are some tests for the "wrapping" scripts and tests for integration testing.
These two are separated to keep the "wrapping" scripts as fast as possible.
To run the normal tests simply run `npm test`, and for integration `npm run test-integration`.

> These tests depend on built files, make sure you build it before testing.

```bash
$ npm run test
$ npm run test-integration
```

### Debug

Nearley comes with some extra useful grammar debugging tools.
This script allows you to get a railroad visualisation of the grammar itself.
A html file with the visualisation is created at `grammar-debug.html`.

```bash
$ npm run debug
```
