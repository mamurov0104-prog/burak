/*
Shunday function yozing, u string parametrga ega bolsin. String "1+2" holatda
 pass qilinganda string ichidagi sonlar yigindisini number holatda qaytarsin.
  MASALAN: calculate("1+3") return 4. */

function calculate(str: string): number {
  // '+' bo'yicha stringni bo'lib olamiz
  const numbers = str.split('+').map(Number); // har bir elementni numberga o'tkazamiz
  // sonlarni yig'indisini hisoblaymiz
  const sum = numbers.reduce((acc, curr) => acc + curr, 0);
  return sum;
}

// Test
console.log(calculate("1+3")); // Natija: 4
console.log(calculate("101+102+103")); // Natija: 35



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

