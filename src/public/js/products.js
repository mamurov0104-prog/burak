
console.log("Products frontend javascript file");

$(function () {
  $(".product-collection").on("change", function () {
    const selectedValue = $(this).val();

    if (selectedValue === "DRINK") {
      $("#product-volume").show();
      $("#product-collection").hide();
    } else {
      $("#product-volume").hide();
      $("#product-collection").show();
    }
  });

  $("#process-btn").on("click", () => {
    $(".dish-container").slideToggle(500);
//     $("#process-btn").css("display" , "none");
    $("#process-btn").hide();
  });

  $("#cancel-btn").on("click", () => {
    $(".dish-container").slideToggle(100);
    // $("#process-btn").hide();
   $("#process-btn").css("display" , "flex");

  });

});

function validateForm() {
  const productName = $(".product-name").val();
  const productPrice = $(".product-price").val();
  const productLeftCount = $(".product-left-count").val();
  const productCollection = $(".product-collection").val();
  const productDesc = $(".product-desc").val();

  if (
    !productName ||
    !productPrice ||
    !productLeftCount ||
    !productCollection ||
    !productDesc
  ) {
    alert("Please insert all details!");
    return false;
  }

  return true;
}

function previewFileHandler(input, order) {
  const file = input.files[0];
  if (!file) return;

  const validImageType = ["image/jpg", "image/jpeg", "image/png"];
  if (!validImageType.includes(file.type)) {
    alert("Please insert only jpeg, jpg or png!");
    input.value = "";
    return;
  }

  const reader = new FileReader();
  reader.onload = function () {
    $(`#image-section-${order}`).attr("src", reader.result);
  };
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



