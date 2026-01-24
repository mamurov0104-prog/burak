function countVowels(str: string): number {
    // barcha unli harflar ro'yxati
    const vowels = "aeiouAEIOU";
    let count = 0;

    for (let char of str) {
        if (vowels.includes(char)) {
            count++;
        }
    }

    return count;
}

// Test
console.log(countVowels("hojayin"));
console.log(countVowels("fergana is beautiful")); 
console.log(countVowels("TypeScriptni ozgarnish")); 
