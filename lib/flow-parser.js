/**
 * espree + flow-type service
 */

"use strict";

const { execFileSync } = require("child_process");
const espree = require("espree");
const eslintScope = require("eslint-scope");
const evk = require("eslint-visitor-keys");
const estraverse = require("estraverse");

/**
 * Generate key based on corresponding location in source code
 * @param {Object} type FlowType information
 * @returns {string} String key in form of `startLine#startCol-endLine#endCol`
 */
function typeToKey(type) {
    return `${type.loc.start.line}#${type.loc.start.column}.${type.loc.end.line}#${type.loc.end.column}`;
}

/**
 * Generate key based on corresponding location in source code: 0-based [) -> 1-based []
 * @param {Object} node ESTree node
 * @returns {string} String key in form of `startLine#startCol-endLine#endCol`
 */
function nodeToKey(node) {
    return `${node.loc.start.line}#${node.loc.start.column + 1}.${node.loc.end.line}#${node.loc.end.column}`;
}


exports.parseForESLint = function(code, options) {
    const ast = espree.parse(code, options);

    const locToType = new Map();
    const flowCmd = require("flow-bin");
    const flowOut = execFileSync(flowCmd, ["dump-types", "--json", options.filePath], {
        encoding: "utf8"
    });
    const flowTypes = JSON.parse(flowOut);

    // build index
    flowTypes.forEach(type => locToType.set(typeToKey(type), type.type));

    estraverse.traverse(ast, {
        enter(node) {
            const rawTypeStr = locToType.get(nodeToKey(node));

            if (rawTypeStr) {
                node.valueType = rawTypeStr;
            }
        }
    });

    return {
        ast,
        scopeManager: eslintScope.analyze(ast),
        visitorKeys: evk.KEYS
    };
};
