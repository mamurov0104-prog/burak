// ==============================================
// PRODUCTS FRONTEND JAVASCRIPT
// ==============================================

// Axios kutubxonasi import qilinadi, u HTTP requestlar yuborish va server bilan ma'lumot almashish uchun ishlatiladi
// const { default: axios } = require("axios"); 

// Log chiqarish: fayl frontendda yuklanganini tekshirish uchun
console.log("Products frontend javascript file");

// --------------------------------------------------
// jQuery Document Ready block
// --------------------------------------------------
// $(function(){ ... }) ichidagi kod faqat DOM to‘liq yuklangandan keyin ishlaydi.
// Bu, masalan, inputlar, selectlar va divlarni ishlatishdan oldin mavjud bo‘lishini ta'minlaydi.
$(function () {

  // -----------------------------------------------
  // PRODUCT TYPE SELECTION TOGGLE
  // -----------------------------------------------
  // ".product-collection" select elementi o‘zgarganda ishlaydi
  $(".product-collection").on("change", function () {

    // Tanlangan value-ni oladi. Misol: "DISH", "DRINK", "SALAD"
    const selectedValue = $(this).val();

    // Agar tanlangan product type "DRINK" bo‘lsa
    if (selectedValue === "DRINK") {
      $("#product-volume").show();       // Drink volume tanlash divini ko‘rsatadi
      $("#product-collection").hide();   // Dish size selectini yashiradi
    } else {
      // Agar tanlangan boshqa product bo‘lsa (Dish, Salad, Dessert, Other)
      $("#product-volume").hide();       // Drink volume divini yashiradi
      $("#product-collection").show();   // Dish size selectini ko‘rsatadi
    }
  });

  // -----------------------------------------------
  // NEW PRODUCT BUTTON CLICK HANDLER
  // -----------------------------------------------
  // "#process-btn" tugmasi bosilganda formni ko‘rsatish/slide qilish
  $("#process-btn").on("click", () => {

    // ".dish-container" formni 0.5s slide bilan ochadi/yashiradi
    $(".dish-container").slideToggle(500);

    // Tugmani yashiradi, shunda foydalanuvchi yana bosmaydi
    $("#process-btn").hide();
  });

  // -----------------------------------------------
  // CANCEL BUTTON CLICK HANDLER
  // -----------------------------------------------
  // "#cancel-btn" tugmasi bosilganda formni yopish
  $("#cancel-btn").on("click", () => {

    // Formni 0.1s slide bilan tez yopadi
    $(".dish-container").slideToggle(100);

    // "New Product" tugmasini qayta ko‘rsatadi
    $("#process-btn").css("display" , "flex");
  });

  // -----------------------------------------------
  // PRODUCT STATUS CHANGE HANDLER
  // -----------------------------------------------
  // ".new-product-status" select elementi o‘zgarganda ishlaydi
  $(".new-product-status").on("change", async function(e) {

    // e.target.id — select elementining idsi (bu product _id ga teng)
    const id = e.target.id;

    // Tanlangan status value olinyapti: "PAUSE", "PROCESS", "DELETE"
    const productStatus = $(`#${id}.new-product-status`).val();

    console.log("id" , id);                  // Log: product id
    console.log("productStatus",productStatus); // Log: tanlangan status

    try {
      // Axios POST request: serverga product status update qilish uchun
      // URL: `/admin/product/:id`, body: { productStatus: '...' }
      const response = await axios.post(`/admin/product/${id}`, {productStatus: productStatus});
      const result = response.data;

      if(result.data){
        // Agar backend muvaffaqiyatli statusni update qilsa
        console.log("product updated" );

        // Focusni selectdan olib tashlaydi (blur)
        $(".new-product-status").blur();
      } else {
        // Agar backend update qilmasa
        alert("Product update failed!");
      }
    } catch(err){
      // Agar request xato bersa, consolega log qiladi va alert ko‘rsatadi
      console.log(err);
      alert("Product update failed");
    }
  });

}); // Document ready tugadi

// ==============================================
// FORM VALIDATION FUNCTION
// ==============================================
// Bu funksiya form submit bo‘lishidan oldin chaqiriladi
function validateForm() {

  // Har bir input/select/textarea elementining qiymatini oladi
  const productName = $(".product-name").val();          // Product nomi
  const productPrice = $(".product-price").val();        // Product narxi
  const productLeftCount = $(".product-left-count").val(); // Product qoldiq soni
  const productCollection = $(".product-collection").val(); // Product turi
  const productDesc = $(".product-desc").val();           // Product description

  // Agar biror element bo‘sh bo‘lsa
  if (!productName || !productPrice || !productLeftCount || !productCollection || !productDesc) {

    // Foydalanuvchiga alert beradi
    alert("Please insert all details!");

    // Form submitni to‘xtatadi
    return false;
  }

  // Agar barcha inputlar to‘ldirilgan bo‘lsa, form submit qilinadi
  return true;
}

// ==============================================
// IMAGE PREVIEW FUNCTION
// ==============================================
// Fayl tanlanishi bilan darhol rasmni ko‘rsatadi
// input: file input element
// order: qaysi img tag (1-5) ko‘rsatish
function previewFileHandler(input, order) {

  // Tanlangan faylni oladi
  const file = input.files[0];
  if (!file) return;  // Agar fayl tanlanmagan bo‘lsa, tugatadi

  // Faqat jpg/jpeg/png fayllar qabul qilinadi
  const validImageType = ["image/jpg", "image/jpeg", "image/png"];
  if (!validImageType.includes(file.type)) {

    // Agar noto‘g‘ri fayl bo‘lsa alert beradi
    alert("Please insert only jpeg, jpg or png!");

    // Inputni tozalaydi
    input.value = "";

    return;
  }

  // FileReader: faylni o‘qiydi va Data URL formatida oladi
  const reader = new FileReader();

  // Fayl o‘qilgach, img src ga o‘rnatiladi
  reader.onload = function () {
    $(`#image-section-${order}`).attr("src", reader.result);
  };

  // Faylni Data URL sifatida o‘qish
  reader.readAsDataURL(file);
}



















































































































































// console.log("Products frontend javascript file");
// $(function () {
//  $(".product-collection").on("change" , ()=>{
//      const selectedValue = $(".product-collection").val();
//      if(selectedValue === "DRINK"){
//         $("#product-volume").show();
//         $("#product-collection").hide();
//      }else{
//          $("#product-volume").hide();
//         $("#product-collection").show();
//      }
//  });
//  $("#process-btn").on("click", ()=>{
//     $(".dish-container").slideToggle(500);
//     $("#process-btn").css("display" , "none");
//  })
// });
// function validateForm() {

//   const productName = $(".product-name").val();         
//   const productPrice = $(".product-price").val();       
//   const productLeftCount = $(".product-left-count").val(); 
//   const productCollection = $(".product-collection").val(); 
//   const productDesc = $(".product-desc").val(); 
//   const productStatus = $(".product-status").val(); 

//   if (
//     productName === "" ||
//     productPrice === "" ||
//     productLeftCount === "" ||
//     productCollection  === "" ||
//     productDesc === "" ||
//     productStatus === ""
//   ) {
//     alert("Please insert all details!");
//     return false
//   } else{
//     return true
//   }
// function previewFileHandler(input, order){
//     const imgClassName = input.className;
//     console.log("imgClassName" , imgClassName)
//     console.log("input" , input);

//     // --- tuzatish: jQuery selector o‘rniga input.files[0] ishlatiladi
//     const file = input.files[0]; 
//     if(!file) return;

//     const fileType = file.type;
//     const validImageType = ["image/jpg", "image/jpeg", "image/png"];
//     if (!validImageType.includes(fileType)) {
//         alert("Please insert only jpeg, jpg or png!");
//         input.value = ""; // noto‘g‘ri file bo‘lsa inputni tozalash
//         return;
//     }

//     const reader = new FileReader();
//     reader.onload = function(){
//         $(`#image-section-${order}`).attr("src", reader.result);
//     };
//     reader.readAsDataURL(file);
// }


// // function previewFileHandler(input, order) {
// //   const imgClassName = "." + input.className;

// //   const file = $(imgClassName).get(0)?.files[0];
// //   if (!file) return true; // file tanlanmagan bo‘lsa validateForm yi to‘xtatmaydi

// //   const fileType = file.type;
// //   const validImageType = ["image/jpg", "image/jpeg", "image/png"];

// //   if (!validImageType.includes(fileType)) {
// //     alert("Please insert only jpeg, jpg or png!");
// //     input.value = "";
// //     return false; //  validateForm ni to‘xtatadi
// //   }

// //   const reader = new FileReader();
// //   reader.onload = function () {
// //     $(`#image-section-${order}`).attr("src", reader.result);
// //   };
// //   reader.readAsDataURL(file);

// //   return true; // ✅ hammasi to‘g‘ri
// // }

 

// //   return true; -- validateForm tugashi --
// }



