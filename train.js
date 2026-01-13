
// Shunday function tuzingki unga integerlardan iborat 
// array pass bolsin va function bizga osha arrayning 
// eng katta qiymatiga tegishli birinchi indexni qaytarsin. MASALAN: getHighestIndex([5, 21, 12, 21, 8]) return qiladi 1 sonini. ushbu masalani uch xil usulda yech yani sodda /osson/qiyin

// -------------  1 start  --------------
function getHighestIndex(arr) {
  let max = arr[0];   // birinchi elementni max deb olamiz
  let index = 0;     // uning indexi 0

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {    // agar yangi son katta bo‘lsa
      max = arr[i];       // maxni yangilaymiz
      index = i;         // indexni ham
    }
  }

  return index;
}
const natija = getHighestIndex([9,10,11,12,13,999,0.1]);
console.log(natija); 
// -------------  1 end  --------------


