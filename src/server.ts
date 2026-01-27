console.log("SERVER.TS LOADED!")
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import app from "./app"
mongoose.connect(process.env.MONGO_URL as string, {})
.then(data=>{
console.log("MongoDb connection succeed");
const PORT = process.env.PORT ?? 3003;
app.listen(PORT,function(){
  console.log(`The server is running successfully on ${PORT}!`)
  console.log(`Admin project on http://localhost:${PORT}/admin \n`)

})
})
.catch(err=>console.log("ERROR on connection MongoDb", err));
// console.log("PORT :", process.env.PORT);

// Cluster => DataBase => Collection => Document




























































// console.log("working properly ! ...");

// const person: string = "Robert";
// const count: number = 23;
// console.log(`My name is ${person} and I am ${count} old ....`)
// // import moment from "moment/ts3.1-typings/moment";
// import moment from "moment";
// const currentTime = moment().format("YYYY MM DD");
// console.log(currentTime)
// // -------------------------------------

// // ------- Arrays : ------

// let numbers: any[] = [1, 2, "3"];
// let users: string[] = ["Ali", "Vali"];

// // ------- object : type Anatation ----- interface korinishi emas bu 
//  let user: { name: string; age: number;} = {
//   name: "Akbar",
//   age: 20
// };


// // ---------- objecy (interface) : -----------------

// interface User {
//   name: string;
//   age: number;
//   email: string;
  
// }

// const u1: User = {
//   name: "Akbar",
//   age: 20,
//   email: "a@gmail.com"
// };


// class Person{
//     age:number;
//     firstName:string;
//     constructor(age:number,firstName:string){
//        this.age = age ;
//        this.firstName = firstName; 
//     }
//     getFullName():string{
//         return `Hi my name is ${this.firstName}`;
//     }
// }

// const person1 = new Person(20,"Hojiakbar") ;
// console.log(person1);


