
// -------------------------- kommentli kodim started ---------------------------
// Fayl to‘g‘ri ulanganini tekshirish uchun
console.log("Signup frontend javascript file");

/*
  ============================
  FORM VALIDATSIYA FUNKSIYASI
  ============================
  Bu funksiya form submit bo‘lishidan OLDIN ishlaydi.
  Agar false qaytsa → form backendga yuborilmaydi.
*/
function validateSignupForm() {

  // jQuery orqali inputlardan qiymatlarni olib olamiz
  const memberNick = $(".member-nick").val(),
  memberPhone = $(".member-phone").val(),      // Telefon raqam
  memberPassword = $(".member-password").val(),
   confirmPassword = $(".confirm-password").val(); // Parolni qayta kiritish

  // Agar birorta input bo‘sh bo‘lsa — formni to‘xtatamiz
  if (
    memberNick === "" ||
    memberPhone === "" ||
    memberPassword === "" ||
    confirmPassword === ""
  ) {
    alert("Please insert all required inputs!");
    return false; // submit bo‘lmaydi
  }

  // Parollar bir xil emasligini tekshiramiz
  if (memberPassword !== confirmPassword) {
    alert("Password differs, please check!");
    return false; // submit bo‘lmaydi
  }

  /*
    File inputni tekshirish
    .get(0) → DOM element
    .files[0] → tanlangan birinchi file
  */
  const memberImage = $(".member-image").get(0).files[0].name
    ? $(".member-image").get(0).files[0].name
    : null;

  // Agar rasm tanlanmagan bo‘lsa
  if (!memberImage) {
    alert("Please insert Restaurant Image!");
    return false; // submit bo‘lmaydi
  }

  // Agar shu joygacha kelib to‘xtamagan bo‘lsa → form yuboriladi
  return true;
}

/*
  ============================
  FILE INPUT CHANGE EVENT
  ============================
  Sahifa to‘liq yuklangandan keyin ishlaydi
*/
$(function () {

  // File inputni topib olamiz
  const fileTarget = $(".file-box .upload-hidden");

  // File nomini saqlash uchun o‘zgaruvchi
  let filename;

  // File tanlanganda ishga tushadi
  fileTarget.on("change", function () {

    // Brauzer FileReader qo‘llab-quvvatlayaptimi
    if (window.FileReader) {

      // Tanlangan file (File object)
      const uploadFile = $(this)[0].files[0];

      // Agar file tanlanmagan bo‘lsa — chiqib ketamiz
      if (!uploadFile) return;

      console.log("uploadFile:", uploadFile);

    
      const fileType = uploadFile["type"];

      // Ruxsat etilgan rasm formatlari
      const validImageType = ["image/jpg", "image/jpeg", "image/png"];

      /*
        Agar file ruxsat etilgan formatda BO‘LMASA
        includes → array ichida bormi yo‘qmi tekshiradi
      */
      if (!validImageType.includes(fileType)) {
        alert("Please insert only jpeg, jpg or png!");
        return; // noto‘g‘ri file bo‘lsa shu yerda to‘xtaydi
      }

      /*
        Agar format to‘g‘ri bo‘lsa:
        - Rasmni preview qilib ko‘rsatamiz
        - URL.createObjectURL → vaqtinchalik rasm manzili
      */
      $(".upload-img-frame")
        .attr("src", URL.createObjectURL(uploadFile))
        .addClass("success");

      // File nomini olamiz
      filename = uploadFile.name;

      // File nomini yonidagi inputga chiqaramiz
      $(this).siblings(".upload-name").val(filename);
    }
  });
  // return true ;
});

// ----------------------------- kommentli kodim end -------------------------------
































































































