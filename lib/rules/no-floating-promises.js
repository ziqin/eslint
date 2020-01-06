/* eslint-disable internal-rules/multiline-comment-style */
/* eslint-disable no-console */
/* eslint-disable padding-line-between-statements */
/* eslint-disable jsdoc/require-jsdoc */

/**
 * @fileoverview require Promise values to be handled appropriately
 * @author Ziqin Wang
 * Related to https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/src/rules/no-floating-promises.ts
 */

"use strict";


function isPromise(node) {
    const ty = node.flowtype;
    return ty.kind === "generic" && ty.name === "Promise";
}

function isPromiseCatchCallWithHandler(expr) {
    return expr.callee.type === "MemberExpression" &&
        expr.callee.property.name === "catch" &&
        expr.arguments.length >= 1;
}

function isPromiseThenCallWithRejectionHandler(expr) {
    return expr.callee.type === "MemberExpression" &&
        expr.callee.property.name === "then" &&
        expr.arguments.length >= 2;
}

module.exports = {
    meta: {
        type: "problem",
        docs: {
            description: "require Promise values to be handled appropriately",
            category: "Best Practices",
            recommended: false,
            url: "https://eslint.org/docs/rules/no-floating-promises"
        },

        schema: [
            {
                type: "object",
                properties: {
                    ignoreVoid: { type: "boolean" }
                },
                additionalProperties: false
            }
        ],

        messages: {
            floating: "Promises must be handled appropriately."
        }
    },

    defaultOptions: [
        { ignoreVoid: false }
    ],

    create(context) {
        function isUnhandledPromise(node) {
            if (node.type === "BinaryExpression" && node.operator === ",") {
                return isUnhandledPromise(node.left) || isUnhandledPromise(node.right);
            }
            if (node.type === "UnaryExpression" && node.operator === "void" && !context.options[0].ignoreVoid) {
                return isUnhandledPromise(node.argument);
            }
            if (!isPromise(node)) {
                return false;
            }
            if (node.type === "CallExpression") {
                return !isPromiseCatchCallWithHandler(node) && !isPromiseThenCallWithRejectionHandler(node);
            }
            if (node.type === "ConditionalExpression") {
                return isUnhandledPromise(node.consequent) || isUnhandledPromise(node.alternate);
            }
            if (node.type === "MemberExpression" || node.type === "Identifier" || node.type === "NewExpression") {
                return true;
            }
            return false;
        }

        return {
            ExpressionStatement(node) {
                if (node.expression && isUnhandledPromise(node.expression)) {
                    context.report({
                        messageId: "floating",
                        node
                    });
                }
            }
        };
    }
};
