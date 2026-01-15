

function getPositive1(arr: number[]): string {
    // Natija saqlanadigan bo‘sh string yaratan,nkj
    let result: string = "";

    // Arrayning har bir elementini qolga olish kerak bu yerda 
    for (let i = 0; i < arr.length; i++) {
        let num: number = arr[i]; //qolga olingan element manshu hisobkkandi

        // Agar element musbat bo‘lsa, uni stringga aylantirib natijaga qo‘shamiz
        if (num > 0) {
            result += num.toString();
        }
    }

   
    return result;
}


const numbers: number[] = [1, -4, 2];
const positiveString: string = getPositive1(numbers);

console.log("Musbat sonlar string ko‘rinishda:", positiveString); // "12"
