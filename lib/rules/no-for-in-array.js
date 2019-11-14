/**
 * @fileoverview Try to write my first ESLint rule
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
         * Find the information of an variable along the scope link
         * @param {Identifier} identifier AST node of the identifier
         * @returns {Variable|void} variable's information if found
         */
        function findVar(identifier) {
            for (let scope = context.getScope(identifier); scope !== null; scope = scope.upper) {
                const mapByName = scope.set;

                if (mapByName.has(identifier.name)) {
                    return mapByName.get(identifier.name);
                }
            }
            return null;
        }

        /**
         * Check whether an AST node corresponds to an Array object
         * @param {*} node the identifier to check
         * @returns {boolean} whether it is an array
         */
        function isArray(node) {
            if (node === null) {
                return false;
            }
            switch (node.type) {
                case "ArrayExpression":
                    return true;
                case "NewExpression":
                    return node.callee.type === "Identifier" && node.callee.name === "Array";
                case "Identifier":
                    return findVar(node).valueType === "Array";
                default:
                    return false;
            }
        }

        /**
         * Check
         * @param {ForInStatement} node the for-in statement to check
         * @returns {void}
         */
        function checkForIn(node) {

            // console.debug("Checking source code: \n", sourceCode.getText(node));

            const expr = node.right;

            if (isArray(expr)) {
                context.report({
                    loc: expr.loc,
                    messageId: "alert",
                    data: { array: sourceCode.getText(expr) }
                });
            }
        }

        return {
            ForInStatement: checkForIn,

            VariableDeclarator(declarator) {
                if (declarator.init && isArray(declarator.init)) {
                    findVar(declarator.id).valueType = "Array";
                }
            },

            AssignmentExpression(statement) {
                if (statement.left.type === "Identifier" && isArray(statement.right)) {
                    findVar(statement.left).valueType = "Array";
                }
            }
        };
    }
};
