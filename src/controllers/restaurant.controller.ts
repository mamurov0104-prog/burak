console.log(" RESTAURANT CONTROLLER LOADED");
import { Request,Response,NextFunction} from "express";
import {T} from "../libs/types/common";
import MemberService from "../models/Member.service";
import { MemberInput , LoginInput, AdminRequest } from "../libs/types/member";
import { MemberType } from "../libs/enums/member.enum";
import Errors, { HttpCode, Message } from "../libs/Errors";
import { error } from "console";
const memberService = new MemberService();
const restaurantController:T={};

restaurantController.goHome=(req:Request,res:Response)=>{

    try{
      res.render("home");
    //  res.send("Home page");
     console.log("Coming HomePage!");
     // Logon , service model , ...
    }catch(err){
      console.log("Error, goHome :",err);
      res.redirect("/admin")

    }

}



restaurantController.getLogin=(req:Request,res:Response)=>{

    try{
     console.log("Coming LoginPage!");

    //  res.send("login page");

      res.render("login");

    }catch(err){
      console.log("Error, goLogin :",err);
      res.redirect("/admin")

    }

}


restaurantController.getSignup=(req:Request,res:Response)=>{

    try{
     console.log("Coming SignUp Page!");

    //  res.send("signUp page");
      res.render("signup");


    }catch(err){
      console.log("Error, signUp :",err);
      res.redirect("/admin")
    }

}

// -------------------------

restaurantController.processSignup= async (req:AdminRequest,res:Response)=>{
    /*Controllerimi asinxron metodda shakllantirilgan , buning 2ta parametri bor ular 
    req:AdminbRequest va res:response (typeni ozimiz belgilab olganmiz bularni )

    try catch error handling standardidan foydalandik maqsad errorni qolga 
    olish agar error bolsa
    */

    try{
     console.log("Coming process SignUp Page!");
     console.log("Body :", req.body);
      const file = req.file;
      console.log("file :",file);
      if(!file) throw new Errors(HttpCode.BAD_REQUEST,Message.SOMETHING_WENT_WRONG);
      console.log("file :",file);
      const newMember:MemberInput = req.body;
      newMember.memberImage = file?.path.replace(/\\/g, '');// agar teskasi bolsa togirlab beradi;
      // request ichida kelyatgan
      //  bodyni yangi newMember degankonstantaga tenglab oldik va uniy 
      // type MemberInputga tenf
      newMember.memberType = MemberType.RESTAURANT; // hamda osha newMember konstantamizni 
    //  ichidagi memberTypeni MemberType enum ichidagi Restaurant degan qiymat bn boyitdik
     const result = await memberService.processSignup(newMember);
          /*
          Va keyingi qatorda, memberService objectini processSignup methodini chaqirib
      unga newMember objectini argument sifatida tashladik. Va uni javobini kutib
      (await) natijani result konstantasiga saqladik
          */

      /* Hamda yakunda o’sha result objectimizni clientga jo’natib yubordik (yani shu data
      // bn clientga javob berdik)*/
        req.session.member = result;
        req.session.save(function(){
        res.redirect("/admin/product/all");
        });
         // resultga tenglaguncha vaqt ketadi yani
        //bzning frontendimizga (postmanga) borib cookies ni ichiga 
        // stickni joylab keladi , keyin sessions collectionimizga manabu
        //  result data(memberdata)ni borib saqlaydi , shuning uchun har ikkala process
        //  amalga oshishi uchun 


    }catch(err){
      console.log("Error, process signUp :",err);
      
        const message = err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
       res.send(`<script>alert("${message}; window.location.replace('admin/signup')")</script>`);

    }

}

// ------------------------------ < login POST started  > --------------------------------------------

restaurantController.processLogin = async(req:AdminRequest,res:Response)=>{
    /*Kontrollerimiz asinxron methotda shakillantirilgan. Buni 2 ta parametri bor ular
    req (request) va res (response), type larini o’zimiz biriktirib ketganmiz (type
    aytilmasa ham bo’ladi) */
    try{
      /*Keyin try hamda catch blogidan foydalandik, buning eng muhum sababi - error
    handling (xatolarni boshqarish, ushlash) uchun */
     console.log("Coming processLogin!", req.body); 
     /*Aynan shu kantrollerga yetib kelganligini bilish maqsadida o’zimiz 
     uchun log qoldirdik. */
     
      const input: LoginInput = req.body;
      /* frontendan kelyatgan data (req.body) ni inputga tenglab oldik va 
      uning typeni biz LoginInput deb belgilab oldik
      Bu ma’lumotlar req.body orqali controllerga keladi :
            {"memberNick": "restaurant1",
            "memberPassword": "123456"}
                                  
      */
      const result = await memberService.processLogin(input);
      /*member service modeldan hosil qilgan opjectimizni processLogin metodiga argument sifatida 
      pass qilyabmiz va u member.sevice ketib  */
      
        req.session.member = result;
        req.session.save(function(){
        // res.send(result);
        res.redirect("/admin/product/all");

       

        });
    //  res.send(result);


    }catch(err){
      console.log("Error, processLogin :",err);
       const message = err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
       res.send(`<script>alert("${message}"); window.location.replace('admin/login')</script>`);
    }

}

// ------------------------------------------------------- < login POST finished  > --------------------------------------------

// ------------------------------------------------------- < logOut GET started  > --------------------------------------------


restaurantController.logout = async(
  req:AdminRequest,
  res:Response)=>{
    try{
     console.log("Coming LogOut!");
    req.session.destroy(function(){
    res.redirect("/admin")
    });

    }catch(err){
      console.log("Error, logout :",err);
      res.send(err);
    }

}



// ------------------------------------------------------- < logOut GET finished  > --------------------------------------------



// ------------------------------------------------------- < getUsers GET started  > --------------------------------------------


restaurantController.getUsers = async(
  req:AdminRequest,
  res:Response)=>{
    try{
     console.log("Coming getUser!");
    const result = await memberService.getUsers();
     console.log("result", result);

    res.render("users",{users:result});
     
    }catch(err){
      console.log("Error, getUser :",err);
      res.redirect("/admin/login");
    }

}



// ------------------------------------------------------- < getUser GET finished  > --------------------------------------------
// ------------------------------------------------------- < updateChosenUser GET started  > --------------------------------------------


restaurantController.updateChosenUser = async(
  req:AdminRequest,
  res:Response)=>{
    try{
     console.log("Coming updateChosenUser!");
    req.session.destroy(function(){
    res.redirect("/admin")
    });

    }catch(err){
      console.log("Error, updateChosenUser :",err);
      res.send(err);
    }

}



// ------------------------------------------------------- < updateChosenUser GET finished  > --------------------------------------------



// ----------------------  test  -----------------------------------

restaurantController.checkAuthSession = async(
  req:AdminRequest,
  res:Response)=>{

    try{
      console.log("checkAuthSession is loaded")
if(req.session?.member){
  res.send(`<script>alert("${req.session.member.memberNick}")</script>`);
}
else res.send(`<script>alert("${Message.NOT_AUTHONTICATED}")</script>`);

    }catch(err){
      console.log("Error, checkAuthSession :",err);
      res.send(err);
    }

}
// ------------------------------------------------ verify ----------------------------

restaurantController.verifyRestaurant = (
  req:AdminRequest,
  res:Response,
  next: NextFunction 
) =>{

    
    if(req.session?.member?.memberType === MemberType.RESTAURANT){
      req.member = req.session.member;
      next();
    }
    else{
      const message = Message.NOT_AUTHONTICATED;
     res.send(`<script>alert("${Message.NOT_AUTHONTICATED}"); window.location.replace('/admin/login')</script>`)
    }
}

export default restaurantController;