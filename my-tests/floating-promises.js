/* @flow */

/* eslint no-floating-promises: ["error", { "ignoreVoid": true }] */

/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable padding-line-between-statements */
/* eslint-disable space-before-function-paren */
/* eslint-disable jsdoc/require-jsdoc */

"use strict";

async function asyncFunc() {
    return "async function";
}

asyncFunc();

asyncFunc()
    .then(ans => {
        console.log(ans);
    });

asyncFunc()
    .then(ans => {
        console.log(ans);
    })
    .catch(err => {
        console.error(err);
    });

async function anotherAsyncFunc() {
    const ans = await asyncFunc();
    console.log(ans);
}
