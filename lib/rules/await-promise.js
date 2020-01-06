/* eslint-disable no-console */
/* eslint-disable padding-line-between-statements */
/* eslint-disable jsdoc/require-jsdoc */

/**
 * @fileoverview disallow awaiting a value that is not a Promise
 * @author Ziqin Wang
 */
"use strict";


function isPromise(node) {
    const ty = node.flowtype;
    return ty.kind === "generic" && ty.name === "Promise";
}


module.exports = {
    meta: {
        type: "problem",
        docs: {
            description: "disallow awaiting a value that is not a Promise",
            category: "Best Practices",
            recommended: false,
            url: "https://eslint.org/docs/rules/await-promise"
        },
        schema: [],
        messages: {
            await: "Unexpected `await` of a non-Promise value."
        }
    },

    create(context) {
        return {
            AwaitExpression(node) {
                if (node && !isPromise(node.argument)) {
                    context.report({
                        loc: node.loc,
                        messageId: "await"
                    });
                }
            }
        };
    }
};
