
function printNumbers(): void {
  let count = 1;

  const interval = setInterval(() => {
    console.log(count);
    count++;

    if (count > 5) {
      clearInterval(interval);
    }
  }, 1000);
}

// call
printNumbers();

// function reduceNestedArray(arr: (number | any[])[]): number {
//   let sum = 0;

//   for (const item of arr) {
//     if (Array.isArray(item)) {
//       sum += reduceNestedArray(item); // recursive chaqiriq
//     } else {
//       sum += item;
//     }
//   }

//   return sum;
// }

// // Test
// console.log(reduceNestedArray([1, [1, 2, [4]]])); 

// function delayHelloWorld(message: string): Promise<string> {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(message);
//     }, 3000); 
//   });
// }
// delayHelloWorld("Hello MIT task").then((result) => {
//   console.log(result); 
// });


// function findDisappearedNumbers(arr: number[]): number[] {
//   const result: number[] = [];

//   //  eng katta sonni topamiz
//   let max = arr[0];
//   for (let i = 1; i < arr.length; i++) {
//     if (arr[i] > max) {
//       max = arr[i];
//     }
//   }

//   //  1 dan max gacha tekshiramiz
//   for (let i = 1; i <= max; i++) {

//     let found = false;

//     //  array ichidan qidiramiz (oddiy usul)
//     for (let j = 0; j < arr.length; j++) {
//       if (arr[j] === i) {
//         found = true;
//         break;
//       }
//     }

//     //  agar topilmasa — demak yo‘q son
//     if (!found) {
//       result.push(i);
//     }
//   }

//   return result;
// }
// console.log(findDisappearedNumbers([1, 3, 4, 7]))
// console.log(findDisappearedNumbers([2, 5, 9, 7]))




// function capitalizeWords(input: string): string {
//   return input.toLowerCase().split(" ").join("_");
// }
// console.log(capitalizeWords("burak loyasi tugatildi batamom!"));


// function capitalizeWords(text: string): string {
//   return text
//     .split(" ")
//     .map((word) => {
//       if (word.length <= 2) {
//         return word; // 1 yoki 2 harf bo'lsa o'zgartirmaymiz
//       }
//       return word.charAt(0).toUpperCase() + word.slice(1);
//     })
//     .join(" ");
// }
// const result = capitalizeWords("soat taxminan 00:10 boldi, uxlashga vaqt yoz vazifa bir dunyo! ");
// console.log(result);



// function removeDuplicate(str: string): string {
//   let result = "";

//   for (const char of str) {
//     if (!result.includes(char)) {
//       result += char;
//     }
//   }

//   return result;
// }

// console.log(removeDuplicate("stringg")); 
// console.log(removeDuplicate("hojiakbarr")); 
// console.log(removeDuplicate("mamurovv")); 
// function changeNumberInArray(
//   index: number,
//   arr: number[],
//   newNumber: number
// ): number[] {
  
//   arr[index] = newNumber;

//   return arr;
// }

// const result = changeNumberInArray(1, [1, 3, 4, 5 , 6 , 7], 2);

// console.log(result);


// function celsiusToFahrenheit(celsius: number): number {
//   return (celsius * 9) / 5 + 32;
// }
// console.log(celsiusToFahrenheit(0));  
// console.log(celsiusToFahrenheit(25));  
// console.log(celsiusToFahrenheit(100)); 



// function randomBetween(a: number, b: number): number {
//   const min = Math.min(a, b);
//   const max = Math.max(a, b);

//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// console.log(randomBetween(1, 30));
// console.log(randomBetween(50, 30));
// console.log(randomBetween(-10, 10));





/* 
ZA-TASK

Shunday function yozing, u array ichidagi objectlarni “age” qiymati boyicha sortlab bersin. MASALAN: sortByAge([{age:23}, {age:21}, {age:13}]) return [{age:13}, {age:21}, {age:23}].

@MITASK
*/
// function sortByAge(arr: { age: number }[]): { age: number }[] {
//   return arr.sort((a, b) => a.age - b.age);
// }
// const result = sortByAge([
//   { age: 45 },
//   { age: 22 },
//   { age: 19 },
// ]);

// console.log(result);
/**
Z-TASK

Shunday function yozing, uni sonlardan tashkil topgan array qabul qilsin. Function arraydagi juft sonlarni yigindisini qaytarsin. MASALAN: sumEvens([1,2,3]) return 2.  
 

 */
// function sumEvens(arr: number[]): number {
//   return arr.reduce((sum, num) => num % 2 === 0 ? sum + num : sum, 0);
// }


// console.log(sumEvens([1, 2, 3]));      
// console.log(sumEvens([4, 5, 6, 7]));   
// console.log(sumEvens([1, 3, 5]));      


/*
Y-TASK

Shunday function yozing, uni 2 ta array parapetri bolsin. Function ikkala arrayda ham ishtirok
 etgan qiymatlarni bir arrayda qaytarsin. MASALAN: findIntersection([1,2,3], [3,2,0]) return [2,3].
*/

// function findIntersection(arr1: number[], arr2: number[]): number[] {
//   const result: number[] = []; // Natija manashetta boladi

//   for (let i = 0; i < arr1.length; i++) {
//     const element = arr1[i];

//     // Agar arr2 da bor va result da hali qo‘shilmagan bo‘lsa
//     if (arr2.includes(element) && !result.includes(element)) {
//       result.push(element);
//     }
//   }

//   return result;
// }

// // ----------------- Test -----------------
// console.log(findIntersection([1,2,2,3], [3,2,0])); 
// console.log(findIntersection([5,1,2,5], [2,5,5,7])); 

/*
Shunday function yozing, uni object va string parapetrlari bolsin. Function string 
parametri object ichida necha marotaba 
takrorlanganligini qaytarsin (nested object bolsa ham sanasin).
 MASALAN: countOccurrences({model: 'Bugatti', steer: {model: 'HANKOOK', size: 30}}, 'model') return 2.
*/
// function countOccurrences(obj: Record<string, any>, targetKey: string): number {
//     let count = 0;

//     for (const key in obj) {
//         if (key === targetKey) {
//             count++;
//         }

//         const value = obj[key];

//         // Agar value object bo'lsa va null emas
//         if (value && typeof value === 'object') {
//             count += countOccurrences(value, targetKey);
//         }
//     }

//     return count;
// }
// const data = {
//     model: 'Chevrolet Cobalt',
//     steer: {
//         model: 'Black disc',
//         size: {
//             white:'300',
//             Black:200
//         }
//     }
// };

// console.log(countOccurrences(data, 'model')); 

/*
W-TASK

Shunday function yozing, uni array va number parametrlari bolsin. Function arrayni numberda berilgan uzunlikda kesib 
bolaklarga ajratilgan array holatida qaytarsin. MASALAN: chunkArray([1,2,3,4,5,6,7,8,9,10], 3) return [[1,2,3], [4,5,6], [7,8,9], [10]].

*/

// function chunkArray(arr: number[], size: number): number[][] {
//     // 1. natijani saqlash uchun bo'sh array yarat
//     const result: number[][] = [];

//     // 2. arrayni aylantirish
//     for (let i = 0; i < arr.length; i += size) {
//         // 3. slice yordamida bo'lakni oling
//         const chunk = arr.slice(i, i + size);

//         // 4. bo'lakni natijaga qo'shing
//         result.push(chunk);
//     }

//     return result;
// }
// const arr = [1,2,3,4,5,6,7,8,9,10];
// const size = 2;

// console.log(chunkArray(arr, size));
















/*V-TASK

Shunday function yozing, uni string parametri bolsin va stringdagi harf va u harf necha marta 
takrorlangani sonidan tashkil topgan object qaytarsin. MASALAN: countChars("hello") return {h: 1, e: 1, l: 2, o: 1}. */

// import { debug } from "console";
// import { randomBytes, randomFillSync } from "crypto";
// import { weekdaysMin } from "moment/ts3.1-typings/moment";
// import { threadCpuUsage } from "process";

                                  // huddi bssr dagi promise kabi
// function countChars(str: string): Record<string, number> {
//    const result: Record<string, number> = {};

//    for(const char of str){
//     if(result[char]){
//          result[char] = result[char] + 1;
//     }
//     else{
//         result[char] = 1;
//     }
//    }

//    return result;
// }
// // console.log(countChars(`${randomFillSync}Hellodanparcha`));
// console.log(countChars(`${randomBytes}Hellodanparcha`));
// // console.log(countChars(`${toString}.Hellodanparcha`));


// console.log(countChars(`Hellodanparcha`))



/*U-TASK

Shunday function yozing, uni number parametri bolsin va 0 dan berilgan
 parametrgacha bolgan oraliqdagi faqat toq sonlar nechtaligini return 
 qilsin. MASALAN: sumOdds(9) return 4; sumOdds(11) return 5.  */

// function sumOdds(n:number){
// let count = 0;

// for(let i = 1; i< n ;i ++){
//   if(i%2 == 0){
//  count ++
//   }

// }
// return count;
// }

// console.log("toq sonlar :" , sumOdds(9));




/*T-TASK

Shunday function yozing, u sonlardan tashkil topgan 2 ta array qabul qilsin va ikkala 
\arraydagi sonlarni tartiblab bir arrayda qaytarsin. MASALAN: mergeSortedArrays([0,3,4,31], [4,6,30]) 
return [0,3,4,4,6,30,31]. */

// function mergeSortedArrays(arr1: number[], arr2: number[]): number[] {
//   //  arr1 va arr2 ni birlashtiramiz.
//   // concat() yangi array qaytaradi va original arraylarni o'zgartirmaydi.
//   const mergedArray = arr1.concat(arr2);

//   // sort() orqali arrayni tartiblaymiz.
//   // (a, b) => a - b bu compare function.
//   // Agar natija manfiy bo'lsa → a oldinda qoladi
//   // Agar musbat bo'lsa → b oldinga o'tadi
//   // Agar 0 bo'lsa → joyi o'zgarmaydi
//   mergedArray.sort((a, b) => a - b);

//   // Tartiblangan arrayni qaytaramiz
//   return mergedArray;
// }

// // Misol uchun chaqirish:
// console.log(mergeSortedArrays([0, 3, 4, 31], [4, 6, 30]));


/**
 * missingNumber funksiyasi
  
 Vazifa:
 0 dan n gacha bo‘lgan sonlar orasidan tushib qolgan bitta sonni topadi.
 Array uzunligi n bo‘lsa, aslida sonlar 0...n oralig‘ida bo‘lishi kerak.
 
  Misol:
  [3,0,1] = 2
 */

// function missingNumber(arr: number[]): number {

//   //  Arrayni o‘sish tartibida saralaymiz
//   // Nega? Chunki index bilan qiymatni solishtiramiz
//   arr.sort((a: number, b: number) => a - b);

//   //  Har bir elementni uning indexi bilan solishtiramiz
//   for (let i = 0; i < arr.length; i++) {

//     // Agar index va qiymat teng bo‘lmasa,
//     // demak aynan shu index tushib qolgan son
//     if (arr[i] !== i) {
//       return i;
//     }
//   }

//   //  Agar loop ichida topilmasa,
//   // demak oxirgi son (n) tushib qolgan
//   return arr.length;
// }

// console.log(missingNumber([3, 0, 1])); 

// console.log(missingNumber([0, 1])); 

// console.log(missingNumber([9,6,4,2,3,5,7,0,1])); 

// console.log(missingNumber([0])); 

// console.log(missingNumber([1])); 





/*
Shunday function yozing, u string parametrga ega bolsin. String "1+2" holatda
 pass qilinganda string ichidagi sonlar yigindisini number holatda qaytarsin.
  MASALAN: calculate("1+3") return 4. */

// function calculate(str: string): number {
//   // '+' bo'yicha stringni bo'lib olamiz
//   const numbers = str.split('+').map(Number); // har bir elementni numberga o'tkazamiz
//   // sonlarni yig'indisini hisoblaymiz
//   const sum = numbers.reduce((acc, curr) => acc + curr, 0);
//   return sum;
// }

// // Test
// console.log(calculate("1+3")); // Natija: 4
// console.log(calculate("101+102+103")); // Natija: 35



/*

Shunday function yozing, u 2 ta parametrgga ega bolib birinchisi object, 
ikkinchisi string. Agar string parametr objectni propertysi bolsa true bolmasa 
false qaytarsin. MASALAN: hasProperty({name: "BMW", model: "M3"}, "model") return true; 
hasProperty({name: "BMW", model: "M3"}, "year") return false.
ts da yozib ber
*/
// obj: object, prop: string → agar prop objda bo'lsa true, aks holda false
// function hasProperty(obj: { [key: string]: any }, prop: string): boolean {
//     // 'in' operatori bilan tekshiramiz
//     return prop in obj;
// }

// // Testlar
// console.log(hasProperty({ name: "BMW", model: "M3" }, "model")); // true
// console.log(hasProperty({ name: "BMW", model: "M3" }, "year"));  // false


// Yoki eski tarzda: obj.hasOwnProperty(prop)


// ----- < 
// Ikkinchi usul > -----
// function objectdanArray(obj: object) {
//   return Object.entries(obj);
// }

// console.log(objectdanArray({ a: 10, b: 20 }));

// function objectToArray(obj: Record<string, any>): any[][] {
//   // Natijani saqlash uchun bo‘sh array hosil qilindi
//   const result: any[][] = [];

//   // Object ichidagi har bir key bo‘yicha aylantiriladi
//   for (let key in obj) {
//     // Har bir key va uning qiymatini alohida array qilib qo‘shiladi
//     result.push([key, obj[key]]);
//   }

//   // Hosil bo‘lgan arrayni kegin qaytaramia
//   return result;
// }

// // Test
// console.log(objectToArray({ a: 10, b: 20 }));



// function palindromCheck(word: string): boolean {
//   const reversed = word.split("").reverse().join("");
//   return word === reversed;
// }

// console.log(palindromCheck("dad")); 
// console.log(palindromCheck("kiyik")); 
// console.log(palindromCheck("kiyim")); 



// // -------------------< yangi MIT task  >----------------

// // Har xil type (number, string, object, boolean va h.k.) bo‘lishi mumkin bo‘lgan
// // array qabul qiladigan function e’lon qilinyapti
// function calculateSumOfNumbers(arr: any[]): number {

//   // Sonlar yig‘indisini saqlash uchun boshlang‘ich qiymat
//   // Dastlab 0 ga teng
//   let sum = 0;

//   // for...of orqali array ichidagi har bir elementni bittadan olamiz
//   for (let item of arr) {

//     // Agar hozirgi elementning type'i "number" bo‘lsa
//     // faqat shundagina uni yig‘indiga qo‘shamiz
//     if (typeof item === "number") {

//       // sum ga item ni qo‘shamiz
//       sum += item;
//     }
//     // Agar item number bo‘lmasa (string, object, boolean va boshqalar)
//     // bu qator ishlamaydi va u element e’tiborga olinmaydi
//   }

//   // Barcha elementlar tekshirib bo‘lingach,
//   // faqat sonlardan iborat umumiy yig‘indini qaytaramiz
//   return sum;
// }

// // ----------- sinab korish  QISMI -----------

// // Functionga har xil type'lardan iborat array berilyapti:
// // 10        -> number (qo‘shiladi)
// // "10"      -> string (qo‘shilmaydi)
// // { son:10} -> object (qo‘shilmaydi)
// // true      -> boolean (qo‘shilmaydi)
// // 35        -> number (qo‘shiladi)
// console.log(
//   calculateSumOfNumbers([10, "10", { son: 10 }, true, 35])
// );

