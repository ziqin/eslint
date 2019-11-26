/**
 * espree + flow-type service
 */

"use strict";

const espree = require("espree");
const eslintScope = require("eslint-scope");
const evk = require("eslint-visitor-keys");
const { execFileSync } = require("child_process");

exports.parseForESLint = function(code, options) {
    const ast = espree.parse(code, options);
    const scopeManager = eslintScope.analyze(ast);

    /**
     * To be add
     * @param {Expression} node expression node of ESTree AST
     * @param {string} filename full path of the source file
     * @returns {string} to be add
     */
    function getType(node, filename) {
        const flowCmd = require("flow-bin");
        const flowArgs = [
            "type-at-pos",
            "--json",
            filename,
            node.loc.start.line, // FIXME: eliminate implicit type coercion
            node.loc.start.column + 1 // flow use 1-based index
        ];

        const out = execFileSync(flowCmd, flowArgs, {
            encoding: "utf8"
        });

        return JSON.parse(out).type;
    }

    return {
        ast,
        services: {
            getType
        },
        scopeManager,
        visitorKeys: evk.KEYS
    };
};

exports.parse = function(code, options) {
    return espree.parse(code, options);
};
