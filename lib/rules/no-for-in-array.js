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

        fixable: null, // or "code" or "whitespace"

        schema: [],

        messages: {
            alert: "Don't use for-in loop to iterate array {{ array }}."
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
            if (node === null) {
                return false;
            }
            const type = context.parserServices.getType(node, context.getFilename());
            console.log("debug: raw type string:", type);
            return type.startsWith("Array<");
        }

        return {
            ForInStatement(node) {
                const expr = node.right;

                if (isArray(expr)) {
                    context.report({
                        loc: expr.loc,
                        messageId: "alert",
                        data: { array: sourceCode.getText(expr) }
                    });
                }
            }
        };
    }
};
