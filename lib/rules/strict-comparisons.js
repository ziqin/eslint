/**
 * @fileoverview Only allow comparisons between primitives.
 * @author Junda Ai
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        type: "problem",

        docs: {
            description: "disallow comparisons between non-primitive type variables",
            category: "Best Practices",
            recommended: false,
            url: "https://eslint.org/docs/rules/strict-comparisons"
        },

        schema: [],

        messages: {
            alert: "Don't do comparison with non-primitive {{ nonPrimitive }}."
        }
    },

    /**
     * Defining the rule
     * @param {Context} context contains information relevant to the context of the rule
     * @returns {Object} an object with methods that ESLint calls to "visit" nodes
     */
    create(context) {

        const sourceCode = context.getSourceCode();
        const comparisonOperators = ["<", ">", "<=", ">=", "==", "!=", "===", "!=="];
        const primitives = ["boolean", "null", "number", "string"];
        const nondeterministic = ["any", "intersection", "union"];

        // /**
        //  * Check whether an AST node corresponds to a primitive type object
        //  * @param {*} node the identifier to check
        //  * @returns {boolean} whether it is a primitive
        //  */
        // function isPrimitive(node) {
        //     return primitives.includes(node.flowtype.kind);
        // }

        /**
         * Check whether an AST node corresponds to a non-primitive type object
         * @param {*} node the AST node to check
         * @returns {boolean} whether it is a non-primitive
         */
        function isNonPrimitive(node) {
            if (!node) {
                return false;
            }
            const kind = node.flowtype.kind;

            return !primitives.includes(kind) && !nondeterministic.includes(kind);
        }

        return {
            BinaryExpression(node) {
                const operator = node.operator;

                if (comparisonOperators.includes(operator)) {
                    if (isNonPrimitive(node.left)) {
                        context.report({
                            loc: node.left.loc,
                            messageId: "alert",
                            data: { nonPrimitive: sourceCode.getText(node.left) }
                        });
                    } else if (isNonPrimitive(node.right)) {
                        context.report({
                            loc: node.right.loc,
                            messageId: "alert",
                            data: { nonPrimitive: sourceCode.getText(node.right) }
                        });
                    }
                }
            }
        };
    }
};
