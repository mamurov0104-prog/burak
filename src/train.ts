
/*T-TASK

Shunday function yozing, u sonlardan tashkil topgan 2 ta array qabul qilsin va ikkala 
\arraydagi sonlarni tartiblab bir arrayda qaytarsin. MASALAN: mergeSortedArrays([0,3,4,31], [4,6,30]) 
return [0,3,4,4,6,30,31]. */

function mergeSortedArrays(arr1: number[], arr2: number[]): number[] {
  //  arr1 va arr2 ni birlashtiramiz.
  // concat() yangi array qaytaradi va original arraylarni o'zgartirmaydi.
  const mergedArray = arr1.concat(arr2);

  // sort() orqali arrayni tartiblaymiz.
  // (a, b) => a - b bu compare function.
  // Agar natija manfiy bo'lsa → a oldinda qoladi
  // Agar musbat bo'lsa → b oldinga o'tadi
  // Agar 0 bo'lsa → joyi o'zgarmaydi
  mergedArray.sort((a, b) => a - b);

  // Tartiblangan arrayni qaytaramiz
  return mergedArray;
}

// Misol uchun chaqirish:
console.log(mergeSortedArrays([0, 3, 4, 31], [4, 6, 30]));


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

