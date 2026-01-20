function findLongestWord(str: string): string {
    // stringni  arrayga aylantirish
    const words: string[] = str.split(' ');

    // eng uzun so'zni topib olsih avval bitta ozgaruvchi olib boldik
    let longestWord: string = "";

    // har doimgidek ha bitta sozni qolga olish kerak in/of index va value uchun edi !
    for (let word of words) {
        if (word.length > longestWord.length) {
            longestWord = word; // agar so'z uzunroq bo'lsa yangilaymiz
        }
    }

    return longestWord;
}


console.log(findLongestWord("bugun havo juda sovuq ammo tabiatimiz musaffo osmon ostida yalt etib yonib turgn quyoshdek tuyilmoqda , sog' bo'las!")); 

/*
Project Standards:
-Logging standards
-Naming standards :
    func,method,variables - camelCase  goHome
    class - Pascal                     MemberService
    folder,file - Kebab
    css - snake_Case
-Error handling 
*/
/*
Traditionl api
rest api
graphql api
*/