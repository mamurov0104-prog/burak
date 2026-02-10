// const { default: axios } = require("axios");
// const { response } = require("express");

$(".member-status").on("change" , function(e){
    const id = e.target.id.trim(); 
    console.log("id" , id);

    const memberStatus = $(`#${id}.member-status`).val();
    console.log("memberStatus" , memberStatus);

    axios.post("/admin/user/edit", {
        _id:id,
        memberStatus:memberStatus,
    }).then((response)=>{
        console.log("response :" , response);
        const result = response.data;
        if(result.data){
            console.log("user updated");
            $(".member-status").blur();
        } else {
            alert("user update failed !");
        }
    }).catch((err) =>{
        console.log("Error : " , err)
        alert("User update failed!")
    })
})
