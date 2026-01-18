function majorityElement(arr: number[]): number {
  let maxCount: number = 0;     // eng katta takrorlanish soni
  let result: number = arr[0]; // javob bo‘ladigan raqam

  // tashqi loop — har bir elementni tekshirish uchu  kerek
  for (let i: number = 0; i < arr.length; i++) {
    let count: number = 0; // hozirgi element necha marta borligini sanaymiz

    // ichki loop — shu elementni yana tekshiradi
    for (let j: number = 0; j < arr.length; j++) {
      if (arr[i] === arr[j]) {
        count++; // agar teng bo‘lsa, +1
      }
    }

    // agar hozirgi element ko‘proq chiqsa
    if (count > maxCount) {
      maxCount = count;
      result = arr[i];
    }
  }

  return result;
}


console.log(majorityElement([1, 2, 3, 4, 5, 4, 3, 4])); 
console.log(majorityElement([11, 2, 11, 4, 11, 4, 3,5 ,2,2,2,2,2,2,2,2,2,2,2,4])); 

