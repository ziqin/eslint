/**
 * @fileoverview Try to write my first ESLint rule
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

const ruleTester = new RuleTester();

ruleTester.run("no-for-in-array", rule, {

    valid: [
        "const arr = [1, 2, 3]; for (const i of arr) console.log(i);",
        "const arr = [4, 5, 6]; for (const i = 0; i < arr.length; i++) { console.log(arr[i]); } "
    ],

    invalid: [
        {
            code: "const arr = [1, 2, 3]; for (const i in arr) console.log(i);",
            errors: [{
                message: "Don't use for-in loop to iterate an array",
                type: "ForInStatement"
            }]
        }
    ]
});
