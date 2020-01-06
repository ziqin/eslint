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
            description: "disallow comparisons with boolean literals",
            category: "Best Practices",
            recommended: false,
            url: "https://eslint.org/docs/rules/no-boolean-literal-compare"
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
            if (node.type === "Literal" && node.flowtype.kind === "boolean") {
                return true;
            }
            return false;
        }

        return {
            BinaryExpression(node) {
                if (comparisonOperators.includes(node.operator)) {
                    if (node.left && isBooleanLiteral(node.left)) {
                        context.report({
                            loc: node.left.loc,
                            messageId: "alert",
                            data: { booleanLiteral: sourceCode.getText(node.left) }
                        });
                    } else if (node.right && isBooleanLiteral(node.right)) {
                        context.report({
                            loc: node.right.loc,
                            messageId: "alert",
                            data: { booleanLiteral: sourceCode.getText(node.right) }
                        });
                    }
                }
            }
        };
    }
};
