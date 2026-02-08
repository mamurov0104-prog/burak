console.log("Signup frontend javascript file");

function validateSignupForm(){
    // console.log("Executed validateSignupForm() ! ")
const memberNick = $(".member-nick").val();
const memberPhone = $(".member-phone").val();
const memberPassword = $(".member-password").val();
const confirmPassword = $(".confirm-password").val();
if(
    memberNick === "" ||
    memberPhone === "" ||
    memberPassword === "" ||
    confirmPassword === "" 
){
alert("please insert all requires inputs !")
return false;
}

if(memberPassword !== confirmPassword){
alert("Password differs , please check")
return false;
}



// console.log("membernick :" , memberNick);    
// return false;
};








$(function(){

// $(".member-nick").click(function(){
// alert($(".member-phone").toggle());
// });
});