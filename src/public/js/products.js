
console.log("Products frontend javascript file");

$(function () {
    $(".product-collection").on("change", () => {
        const selected = $(".product-collection").val();
        if (selected === "DRINK") {
            $(".product-volume").show();
            $(".product-collection").hide();
        } else {
            $(".product-collection").show();
            $(".product-volume").hide();

        }
    });
    $("#process-btn").on("click", () => {
        $(".dish-container").slideToggle(500);
        $("#process-btn").css("display", "none");
    });

    $("#cancel-btn").on("click", () => {
        $(".dish-container").slideToggle(100);
        $("#process-btn").css("display", "flex");
    });

    $(".new-product-status").on("change", async function (e) {
        const id = e.target.id;
        const productStatus = $(`#${id}`).val();

        try {
            const response = await axios.post(`/admin/product/${id}`, {productStatus: productStatus}),
             result = response.data;
            if (result.data) {
                $(".new-product-status").blur();
            } else alert("Product update failed!");
        } catch (error) {
            console.log(error);
            alert("Product update failed!");
        }
    })
});


function validateForm() {
    const productName = $(".product-name").val(),
     productPrice = $(".product-price").val(),
     productLeftCount = $(".product-left-count").val(),
     productCollection = $(".product-collection").val(),
     productDesc = $(".product-desc").val(),
     productStatus = $(".product-status").val();

    if (productName === '' || productPrice === '' || productLeftCount === '' || productCollection === '' || productDesc === '' || productStatus === ''){
      alert("Please insert all required inputs!");
      return false; 
    }

 
}


function previewFileHandler(input, order) {
 const imgClassName = input.className;

 const file = $(`.${imgClassName}`).get(0).files[0];
 
 const fileType = file["type"];
 const validImageType = ["image/jpg", "image/jpeg", "image/png"];
 if(!validImageType.includes(fileType)) {
    alert('Please insert only jpeg, jpg and png!')
 } else {
    if (!file) return false;
    const reader = new FileReader();
    reader.onload = function() {
        $(`#image-section-${order}`).attr("src", reader.result);
    };
    reader.readAsDataURL(file);
 }
}