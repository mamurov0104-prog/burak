// const { default: axios } = require("axios");
// const { response } = require("express");


// $(".member-status") - HTML sahifasidagi barcha select elementlarni tanlaydi
// on("change", function(e)) - select elementi o'zgartirilganda ishlaydigan event listener qo'shadi
$(".member-status").on("change", function(e){
    
    // e.target.id - o'zgartirilgan select elementining id sini oladi
    // trim() - id atrofidagi bo'sh joylarni olib tashlaydi
    const id = e.target.id.trim(); 
    console.log("id", id); // tanlangan select elementining id sini konsolga chiqaradi

    // $(`#${id}.member-status`) - sahifadagi shu id ga ega select elementini tanlaydi
    // .val() - select elementidagi tanlangan option ning qiymatini oladi
    const memberStatus = $(`#${id}.member-status`).val();
    console.log("memberStatus", memberStatus); // tanlangan statusni konsolga chiqaradi

    // axios.post - serverga POST so'rov yuboradi
    // "/admin/user/edit" - serverdagi endpoint, bu yerga statusni yangilash uchun so'rov yuboriladi
    // _id: id, memberStatus: memberStatus - serverga yuboriladigan data
    axios.post("/admin/user/edit", {
        _id: id,
        memberStatus: memberStatus,
    })
    .then((response) => {
        // so'rov muvaffaqiyatli bo'lsa ishlaydi
        console.log("response:", response); // serverdan kelgan javobni konsolga chiqaradi
        const result = response.data; // serverdan kelgan data ni oladi
        if(result.data){
            // agar serverdan result.data true yoki success bo'lsa
            console.log("user updated"); // foydalanuvchi muvaffaqiyatli yangilandi
            $(".member-status").blur(); // select elementining fokusini olib tashlaydi
        } else {
            // agar yangilash muvaffaqiyatsiz bo'lsa
            alert("user update failed!"); // foydalanuvchiga ogohlantirish beradi
        }
    })
    .catch((err) => {
        // serverga so'rov yuborishda xatolik yuz bersa
        console.log("Error:", err); // xatolikni konsolga chiqaradi
        alert("User update failed!"); // foydalanuvchiga xatolik haqida ogohlantiradi
    });
});
