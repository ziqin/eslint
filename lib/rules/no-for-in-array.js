/* eslint-disable no-console */

/**
 * @fileoverview Disallow for-in iteration on Array objects
 * @author Ziqin Wang
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        type: "problem",

        docs: {
            description: "disallow for-in iteration on Array objects",
            category: "Best Practices",
            recommended: false,
            url: "https://eslint.org/docs/rules/no-for-in-array"
        },

        fixable: "code",

        schema: [],

        messages: {
            noForInArray: "Don't use for-in loop to iterate array {{ array }}."
        }
    },

    /**
     * Defining the rule
     * @param {Context} context contains information relevant to the context of the rule
     * @returns {Object} an object with methods that ESLint calls to "visit" nodes
     */
    create(context) {

        // variables should be defined here
        const sourceCode = context.getSourceCode();

        /**
         * Check whether an AST node corresponds to an Array object
         * @param {*} node the identifier to check
         * @returns {boolean} whether it is an array
         */
        function isArray(node) {
            if (!node) {
                return false;
            }
            return node.flowtype.kind === "Arr";
        }

        return {
            ForInStatement(node) {
                const expr = node.right;

                if (isArray(expr)) {
                    context.report({
                        loc: expr.loc,
                        messageId: "noForInArray",
                        data: { array: sourceCode.getText(expr) },
                        fix(fixer) {
                            return fixer.replaceTextRange([node.left.range[1], node.right.range[0]], " of ");
                        }
                    });
                }
            }
        };
    }
};
