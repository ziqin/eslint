/**
 * @fileoverview Rule to forbid comparisons with boolean literals.
 * @author Junda Ai
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        type: "suggestion",

        docs: {
            description: "disallow comaprisons with boolean literals",
            category: "Best Practices",
            recommended: false,
            url: "https://eslint.org/docs/rules/strict-comparisons"
        },

        schema: [],

        messages: {
            alert: "Don't do comparison with boolean literal {{ booleanLiteral }}."
        }
    },

    create(context) {

        const sourceCode = context.getSourceCode();
        const comparisonOperators = ["==", "!=", "===", "!=="];

        /**
         * Check whether an AST node corresponds to a boolean literal
         * @param {*} node the identifier to check
         * @returns {boolean} whether it is a boolean literal
         */
        function isBooleanLiteral(node) {
            if (!node) {
                return false;
            }

            if (node.type === "Literal" && node.flowtype.kind === "Bool") {
                return true;
            }
        }

        return {
            BinaryExpression(node) {
                const operator = node.operator;

                if (comparisonOperators.includes(operator)) {
                    if (isBooleanLiteral(node.left)) {
                        context.report({
                            loc: node.left.loc,
                            messageId: "alert",
                            data: { booleanLiteral: sourceCode.getText(node.left) }
                        })
                    } else if (isBooleanLiteral(node.right)) {
                        context.report({
                            loc: node.right.loc,
                            messageId: "alert",
                            data: { booleanLiteral: sourceCode.getText(node.right) }
                        })
                    }
                }
            }
        }
    }
}
