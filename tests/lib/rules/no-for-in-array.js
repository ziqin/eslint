/**
 * @fileoverview Test for no-for-in-array rule.
 * @author Ziqin Wang
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/no-for-in-array"),
    { RuleTester } = require("../../../lib/rule-tester");


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
    parser: `${__dirname}/../../../lib/flow-parser.js`
});

ruleTester.run("no-for-in-array", rule, {
    valid: [
        "var arr = [4, 5, 6]; for (var i = 0; i < arr.length; i++) {} ",
        {
            code: "for (let i of [1, 2, 3]) {}",
            parserOptions: { ecmaVersion: 6 }
        },
        {
            code: "const arr = [1, 2, 3]; for (const i of arr) {}",
            parserOptions: { ecmaVersion: 6 }
        },
        {
            code: "const obj = {a: 1, b: 2}; for (let attr in obj) {}",
            parserOptions: { ecmaVersion: 6 }
        }
    ],

    invalid: [
        {
            code: "const arr = [1, 2, 3]; for (const i in arr) {}",
            parserOptions: { ecmaVersion: 6 },
            errors: [{ messageId: "noForInArray", type: "ForInStatement" }]
        },
        {
            code: "for (let i in [1, 2, 3]) {}",
            parserOptions: { ecmaVersion: 6 },
            errors: [{ messageId: "noForInArray", type: "ForInStatement" }]
        }
    ]
});
