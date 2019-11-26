/* eslint no-for-in-array: "error" */
/* eslint-disable no-unused-vars */
/* eslint-disable guard-for-in */
/* eslint-disable no-array-constructor */
/* eslint-disable prefer-const */
/* eslint-disable jsdoc/require-jsdoc */
/* eslint-disable no-console */

// @flow

"use strict";

const a = {
    a1: "1",
    a2: 2
};

const c = [1, 2, 3];

for (const element in a) {
    console.log(element);
}
