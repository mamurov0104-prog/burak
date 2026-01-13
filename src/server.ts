console.log("working properly ! ...");

const person: string = "Robert";
const count: number = 23;
console.log(`My name is ${person} and I am ${count} old ....`)
// import moment from "moment/ts3.1-typings/moment";
import moment from "moment";
const currentTime = moment().format("YYYY MM DD");
console.log(currentTime)
// -------------------------------------
class Person {
    age:number;
    firstName:string;
    constructor(age:number,firstName:string){
       this.age = age ;
       this.firstName = firstName; 
    }
    getFullName():string{
        return `Hi my name is ${this.firstName}`;
    }
}

const person1 = new Person(20,"Hojiakbar") ;
console.log(person1);

// ------- Arrays : ------

let numbers: number[] = [1, 2, 3];
let users: string[] = ["Ali", "Vali"];

// ------- object : type Anatation ----- interface korinishi emas bu 
 let user: {
  name: string;
  age: number;
} = {
  name: "Akbar",
  age: 20
};


// ---------- objecy (interface) : -----------------

interface User {
  name: string;
  age: number;
  email: string;
}

const u1: User = {
  name: "Akbar",
  age: 20,
  email: "a@gmail.com"
};