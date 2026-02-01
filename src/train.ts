function palindromCheck(word: string): boolean {
  const reversed = word.split("").reverse().join("");
  return word === reversed;
}

console.log(palindromCheck("dad")); 
console.log(palindromCheck("kiyik")); 
console.log(palindromCheck("kiyim")); 




