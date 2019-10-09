# Purpose

The purpose of this project is to create a configurable user interface for tools and libraries generated in the field. The tool is intended to be an easy to use interface for existing components that have been developed in the field for customers.

## Design

The design is based on the concept or theory self-describing software components. Self describing software components identifiy the minimal necessary information required to consume a component such as identifiying input paramtgers, their data types (and/or UI control types) and if the component is async or sync.

## Authentication

The authentication currently used is Azure Active Directory. Other types will be developed for and tested later.

## React Structure
index
 -- App
 -- -- >component<
 -- -- -- >container<
 -- -- -- >reducer<
 -- -- -- >actions<
 -- -- -- >store<

## Table of Contents

### tslintconfig

[
    //   "eofline": false,
    //   "forin": true,
    //   "label-position": true,
    //   "label-undefined": true,
    //   /* "max-line-length": [true, 140], */
    //   "max-line-length": [true, {"ignore-pattern": "^import |^export {(.*?)}"}],
    //   "no-arg": true,
    //   "no-bitwise": true,
    //   "no-console": [true,
    //     "debug",
    //     "info",
    //     "time",
    //     "timeEnd",
    //     "trace"
    //   ],
    //   "no-construct": true,
    //   "no-debugger": true,
    //   "no-duplicate-key": true,
    //   "no-duplicate-variable": true,
    //   "no-empty": true,
    //   "no-eval": true,
    //   "no-imports": true,
    //   "no-string-literal": false,
    //   "no-trailing-comma": true,
    //   "no-trailing-whitespace": true,
    //   "no-unused-variable": false,
    //   "no-unreachable": true,
    //   "no-use-before-declare": true,
    //   /*"one-line": [true,
    //     "check-open-brace",
    //     "check-catch",
    //     "check-else",
    //     "check-whitespace"
    //   ],*/
    //   "one-line": [true,
    //     "check-open-brace",
    //     "check-catch",
    //     "check-whitespace",
    //   ],
    //   /*"quotemark": [true, "single"],*/
    //   "quotemark": [false, "single", "avoid-escape"],
    //   "radix": true,
    //   "semicolon": true,
    //   "triple-equals": [true, "allow-null-check"],
    //   "variable-name": false,
    //   "whitespace": [true,
    //     "check-branch",
    //     "check-decl",
    //     "check-operator",
    //     "check-separator"
    //   ]
]