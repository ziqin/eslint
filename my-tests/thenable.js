// @flow

/* eslint await-promise: "error" */

/* eslint-disable lines-around-comment */
/* eslint-disable padding-line-between-statements */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable jsdoc/require-jsdoc */

"use strict";

function dummyPromise1() {
    // eslint-disable-next-line no-unused-vars
    return new Promise((resolve, reject) => {
        resolve("dummy-promise-1");
    });
}

function dummyPromise2() {
    return Promise.resolve("dummy-promise-2");
}

function resolveAfter1s() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("resolved-after-1s");
        }, 1000);
    });
}

async function asyncFunc() {
    const tmp = await resolveAfter1s();
    return `async-func: ${tmp}`;
}

async function dummyAsync() {
    return "dummyAsync";
}

function notThenable() {
    return "not-thenable";
}

async function useAwait() {
    console.log("use await:", await dummyPromise1());

    console.log("use await:", await dummyPromise2());

    const notThenableValue = await notThenable();
    console.log("use await:", notThenableValue);
}

dummyPromise1()
    .then(ans => {
        console.log(ans);
    });

dummyPromise2()
    .then(ans => {
        console.log(ans);
    });

resolveAfter1s()
    .then(ans => {
        console.log(ans);
    });

asyncFunc()
    .then(ans => {
        console.log(ans);
    });

void useAwait();
