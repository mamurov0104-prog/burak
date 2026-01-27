function reverseSentence(str: string): string {
  // Kirib kelgan stringni bo'sh joy (" ") bo‘yicha bo‘lib,
  // so‘zlardan iborat array ga aylantiramiz
  return str
    .split(" ")

    // Har bir so‘z ustida alohida ishlash uchun map ishlatamiz
    .map((word: string) =>

      // So‘zni harflarga ajratamiz → array
      // Arrayni teskari qilamiz (reverse)
      // Yana stringga yig‘amiz (join)
      word.split("").reverse().join("")
    )

    // Teskari qilingan so‘zlarni yana bo‘sh joy bilan
    // bitta stringga birlashtiramiz
    .join(" ");
}
console.log(reverseSentence("Bugun hafta kunlaridan dushanba !"));
console.log(reverseSentence("Mening ismim Hojiakbar"));


