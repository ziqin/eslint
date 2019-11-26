// @flow

/* eslint no-for-in-array: "error" */

/* eslint-disable guard-for-in */
/* eslint-disable no-array-constructor */
/* eslint-disable prefer-const */
/* eslint-disable jsdoc/require-jsdoc */
/* eslint-disable no-console */

"use strict";


function goodPractice() {
    const obj = {
        attr1: 1,
        attr2: 2
    };

    console.log("Good practice:");
    for (const attrName in obj) {
        console.log(attrName);
    }
}


// literals
function badPractice1() {
    console.log("Bad practice 1:");

    for (const i in [1, 2, 3]) {
        console.log(typeof i, i + 0);
    }

    for (const i in new Array(4, 5, 6)) {
        console.log(typeof i, i + 0);
    }
}


// variables
function badPractice2() {
    console.log("Bad practice 2:");

    const arr1 = [1, 2, 3];

    for (const i in arr1) {
        console.log(typeof i, i + 0);
    }

    let arr2, arr3;

    arr2 = [4, 5, 6];
    // eslint-disable-next-line prefer-const
    arr3 = arr2;

    const arr4 = arr3;

    for (const i in arr4) {
        console.log(typeof i, i + 0);
    }
}


// upper scope
const globalArr = [1, 2, 3];

function badPractice3() {
    console.log("Bad practice 3:");

    for (const i in globalArr) {
        console.log(typeof i, i + 0);
    }
}


// call expression
function falseNegative1() {
    const arr1 = [1, 2, 3];
    const arr2 = [4, 5, 6];

    console.log("False Negative 1:");
    for (const i in arr1.concat(arr2)) {
        console.log(typeof i, i + 0);
    }
}


// inter-function detection
function foo() {
    return [1, 2, 3];
}

function falseNegative2() {
    const arr = foo();

    console.log("False Negative 2:");
    for (const i in arr) {
        console.log(typeof i, i + 0);
    }
}


goodPractice();
badPractice1();
badPractice2();
badPractice3();
falseNegative1();
falseNegative2();
