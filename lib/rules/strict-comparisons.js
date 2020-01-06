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
            description: "only allow comparisons between primitive type variables",
            category: "Best Practices",
            recommended: false,
            url: "https://eslint.org/docs/rules/strict-comparisons"
        },

        schema: [],

        messages: {
            alert: "Don't do comparison with non-primitive {{ nonPrimive }}."
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
        const primitives = ["Bool", "Null", "Num", "Str", "Inter", "Implicit Any"];

        /**
         * Check whether an AST node corresponds to a primitive type object
         * @param {*} node the identifier to check
         * @returns {boolean} whether it is a primitive
         */
        function isPrimitive(node) {
            if (!node) {
                return false;
            }
            return primitives.includes(node.flowtype.kind);
        }

        return {
            BinaryExpression(node) {
                const operator = node.operator;

                if (comparisonOperators.includes(operator)) {
                    if (!isPrimitive(node.left)) {
                        context.report({
                            loc: node.left.loc,
                            messageId: "alert",
                            data: { nonPrimive: sourceCode.getText(node.left) },
                        })
                    } else if (!isPrimitive(node.right)) {
                        context.report({
                            loc: node.right.loc,
                            messageId: "alert",
                            data: { nonPrimive: sourceCode.getText(node.right) },
                        })
                    }
                }
            }
        }
    }
}
