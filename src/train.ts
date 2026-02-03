function palindromCheck(word: string): boolean {
  const reversed = word.split("").reverse().join("");
  return word === reversed;
}

console.log(palindromCheck("dad")); 
console.log(palindromCheck("kiyik")); 
console.log(palindromCheck("kiyim")); 



// -------------------< yangi MIT task  >----------------

// Har xil type (number, string, object, boolean va h.k.) bo‘lishi mumkin bo‘lgan
// array qabul qiladigan function e’lon qilinyapti
function calculateSumOfNumbers(arr: any[]): number {

  // Sonlar yig‘indisini saqlash uchun boshlang‘ich qiymat
  // Dastlab 0 ga teng
  let sum = 0;

  // for...of orqali array ichidagi har bir elementni bittadan olamiz
  for (let item of arr) {

    // Agar hozirgi elementning type'i "number" bo‘lsa
    // faqat shundagina uni yig‘indiga qo‘shamiz
    if (typeof item === "number") {

      // sum ga item ni qo‘shamiz
      sum += item;
    }
    // Agar item number bo‘lmasa (string, object, boolean va boshqalar)
    // bu qator ishlamaydi va u element e’tiborga olinmaydi
  }

  // Barcha elementlar tekshirib bo‘lingach,
  // faqat sonlardan iborat umumiy yig‘indini qaytaramiz
  return sum;
}

// ----------- sinab korish  QISMI -----------

// Functionga har xil type'lardan iborat array berilyapti:
// 10        -> number (qo‘shiladi)
// "10"      -> string (qo‘shilmaydi)
// { son:10} -> object (qo‘shilmaydi)
// true      -> boolean (qo‘shilmaydi)
// 35        -> number (qo‘shiladi)
console.log(
  calculateSumOfNumbers([10, "10", { son: 10 }, true, 35])
);

