
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
  const memberNick = $(".member-nick").val();         // Restaurant nomi
  const memberPhone = $(".member-phone").val();       // Telefon raqam
  const memberPassword = $(".member-password").val(); // Parol
  const confirmPassword = $(".confirm-password").val(); // Parolni qayta kiritish

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
  const memberImage = $(".member-image").get(0).files[0]
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

      /*
        ❗ MUHIM:
        File object FUNCTION EMAS
        Shuning uchun uploadFile("type") ❌ XATO
        To‘g‘risi → uploadFile.type
      */
      const fileType = uploadFile.type;

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
});

// ----------------------------- kommentli kodim end -------------------------------




































































































// --------------------- video started -------------------------------
// function validateSignupForm(){
//     // console.log("Executed validateSignupForm() ! ")
// const memberNick = $(".member-nick").val();
// const memberPhone = $(".member-phone").val();
// const memberPassword = $(".member-password").val();
// const confirmPassword = $(".confirm-password").val();
// if(
//     memberNick === "" ||
//     memberPhone === "" ||
//     memberPassword === "" ||
//     confirmPassword === "" 
// ){
// alert("please insert all requires inputs !")
// return false;
// }

// if(memberPassword !== confirmPassword){
// alert("Password differs , please check")
// return false;
// }
//  const memberImage = $(".member-image").get(0).files[0] 
//  ? $(".member-image").get(0).files[0].name 
//  : null;

//  if(!memberImage){
//     alert("Please insert Restaurant Image !")
//     return false;
//  }

// };








// $(function(){
// const fileTarget = $(".file-box .upload-hidden");
// let filename;
// fileTarget.on("change", function(){
//     if(window.FileReader){
//         const uploadFile = $(this)[0].files[0];
//         console.log("uploadFile :",uploadFile);
//         const fileType = uploadFile("type");
//         const validImageType = ["image/jpg","image/jpeg","image/png"];
//         if(validImageType.includes(fileType)){
//               alert("Please insert only jpeg,jpg or png !")
//         }
//         else{
//             if(uploadFile){
//                 console.log(URL.createObjectURL(uploadFile));
//                 $(".upload-img-frame")
//                 .attr("src", URL.createObjectURL(uploadFile))
//                 .addClass("success")

//             }
//             filename = $(this)[0].files[0].name
//         }
//         $(this).siblings(".upload-name").val(filename);
//     }
// })

// });


// ----------------- video end ---------------------------

/*
console.log("Signup frontend javascript file");

function validateSignupForm() {
  const memberNick = $(".member-nick").val();
  const memberPhone = $(".member-phone").val();
  const memberPassword = $(".member-password").val();
  const confirmPassword = $(".confirm-password").val();

  if (
    memberNick === "" ||
    memberPhone === "" ||
    memberPassword === "" ||
    confirmPassword === ""
  ) {
    alert("Please insert all required inputs!");
    return false;
  }

  if (memberPassword !== confirmPassword) {
    alert("Password differs, please check!");
    return false;
  }

  return true;
}

$(function () {
  const fileTarget = $(".file-box .upload-hidden");

  fileTarget.on("change", function () {
    // 1 files bor-yo‘qligini tekshiramiz
    if (!this.files || this.files.length === 0) {
      console.log("File tanlanmadi");
      return;
    }

    // 2 To‘g‘ri olish
    const uploadFile = this.files[0];
    console.log("uploadFile:", uploadFile);

    // 3 File type olish
    const fileType = uploadFile.type;
    console.log("fileType:", fileType);
  });
});

*/