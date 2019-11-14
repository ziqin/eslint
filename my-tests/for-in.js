/* eslint-disable guard-for-in */
/* eslint-disable no-array-constructor */
"use strict";

/**
 * For-in loop is used to iterate an object's attributes
 * @returns {void}
 */
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

/**
 * For-in loop is used to iterate an Array literal
 * @returns {void}
 */
function badPractice1() {
    console.log("Bad practice 1:");

    for (const i in [1, 2, 3]) {
        console.log(typeof i, i);
    }

    for (const i in new Array(4, 5, 6)) {
        console.log(typeof i, i);
    }
}

/**
 * For-in loop is used to iterate an Array variable
 * @returns {void}
 */
function badPractice2() {
    console.log("Bad practice 2:");

    const arr1 = [1, 2, 3];

    for (const i in arr1) {
        console.log(typeof i, i);
    }

    let arr2, arr3;

    // eslint-disable-next-line prefer-const
    arr2 = [4, 5, 6];
    // eslint-disable-next-line prefer-const
    arr3 = arr2;
    const arr4 = arr3;

    for (const i in arr4) {
        console.log(typeof i, i);
    }

    // TODO: false negative
    for (const i in arr1.concat(arr2)) {
        console.log(typeof i, i);
    }
}

goodPractice();
badPractice1();
badPractice2();
