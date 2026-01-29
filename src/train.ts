// SquareNumber nomli type e'lon qilinyapti
// Bu type bitta object qanday tuzilishga ega bo‘lishini belgilaydi
// Ya'ni: har bir objectda number va square degan 2 ta property bo‘ladi
type SquareNumber = {
  number: number; // asl raqam
  square: number; // o‘sha raqamning kvadrati
};

// getSquareNumbers functioni e'lon qilinyapti
// arr parametri faqat number[] (raqamlar arrayi) bo‘lishi mumkin
// function natijada SquareNumber[] (objectlar arrayi) qaytaradi
function getSquareNumbers(arr: number[]): SquareNumber[] {

  // map() metodi array ichidagi har bir elementni( korib chiqadh)
  // bitta-bittadan olib, undan yangi element yasaydi
  // va natijada yangi array qaytaradi
  return arr.map(num => ({

    // number property — array ichidagi hozirgi raqam
    number: num,

    // square property — shu raqamning kvadrati boya takidlaganimizdek 
    square: num * num
  }));
}

// call qismi 
console.log(getSquareNumbers([1, 2, 3, 4, 5]));


