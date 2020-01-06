/**
 * @fileoverview Disallow adding variables of types other than number and string.
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
            description: "disallow adding variables of types other than number and string",
            category: "Best Practices",
            recommended: false,
            url: "https://eslint.org/docs/rules/restrict-plus-operands"
        },

        schema: [],

        messages: {
            alert: "Don't use plus operator with operand {{ operand }} of type other than number and string."
        }
    },

    /**
     * Defining the rule
     * @param {Context} context contains information relevant to the context of the rule
     * @returns {Object} and object with methods that ESLint calls to "visit" nodes
     */
    create(context) {

        const sourceCode = context.getSourceCode();

        /**
         * Check whether an AST node corresponds to a number or string
         * @param {*} node the identifier to check
         * @returns {boolean} whether it is a number or string
         */
        function isNumberOrString(node) {
            if (!node) {
                return false;
            }

            const type = node.flowtype.kind;

            if (type === "number" || type === "string") {
                return true;
            }

            return false;
        }

        return {
            BinaryExpression(node) {
                if (node.operator === "+") {
                    if (!isNumberOrString(node.left)) {
                        context.report({
                            loc: node.left.loc,
                            messageId: "alert",
                            data: { operand: sourceCode.getText(node.left) }
                        });
                    } else if (!isNumberOrString(node.right)) {
                        context.report({
                            loc: node.right.loc,
                            messageId: "alert",
                            data: { operand: sourceCode.getText(node.right) }
                        });
                    }
                }
            }
        };
    }
};
