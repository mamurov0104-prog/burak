"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log("working properly ! ...");
const person = "Robert";
const count = 23;
console.log(`My name is ${person} and I am ${count} old ....`);
// import moment from "moment/ts3.1-typings/moment";
const moment_1 = __importDefault(require("moment"));
const currentTime = (0, moment_1.default)().format("YYYY MM DD");
console.log(currentTime);
