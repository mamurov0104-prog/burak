console.log(" RESTAURANT CONTROLLER LOADED");
import { Request,Response} from "express";
import {T} from "../libs/types/common";
import MemberService from "../models/Member.service";
import { MemberInput , LoginInput } from "../libs/types/member";
import { MemberType } from "../libs/enums/member.enum";

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
    }

}



restaurantController.getLogin=(req:Request,res:Response)=>{

    try{
     console.log("Coming LoginPage!");

    //  res.send("login page");

      res.render("login");

    }catch(err){
      console.log("Error, goLogin :",err);
    }

}


restaurantController.getSignup=(req:Request,res:Response)=>{

    try{
     console.log("Coming SignUp Page!");

    //  res.send("signUp page");
      res.render("signup");


    }catch(err){
      console.log("Error, signUp :",err);
    }

}

// ------------------------------------------------------- < login POST started  > --------------------------------------------

restaurantController.processLogin = async(req:Request,res:Response)=>{

    try{
     console.log("Coming processLogin!", req.body); // req.body JSON object bo‘lishi kerak sababi :
     /*
     sabibi biz kiritgan interfaca va 
     Agar siz bodyni JSON formatida yubormasangak:
     req.body.memberNick undefined bo‘ladi
     processLogin ishlamaydi
     Natijada biz “user not found” yoki “password undefined” kabi
      xatolar olamiz
     */
      const input: LoginInput = req.body;
      /*
      Bu ma’lumotlar req.body orqali controllerga keladi :
            {"memberNick": "restaurant1",
            "memberPassword": "123456"}
                                  
      */
      const result = await memberService.processLogin(input);
      /*member service modeldan hosil qilgan opjectimizni processLogin metodiga argument sifatida 
      pass qilyabmiz va u member.sevice ketib  */
     res.send(result);


    }catch(err){
      console.log("Error, processLogin :",err);
      res.send(err);
    }

}

// ------------------------------------------------------- < login POST finished  > --------------------------------------------


restaurantController.processSignup= async (req:Request,res:Response)=>{

    try{
     console.log("Coming process SignUp Page!");
     console.log("Body :", req.body);

      const newMember:MemberInput = req.body;
      newMember.memberType = MemberType.RESTAURANT;
    //  const memberService = new MemberService();
     const result = await memberService.processSignup(newMember);

     res.send("process signUp page");

    }catch(err){
      console.log("Error, process signUp :",err);
    }

}
export default restaurantController;