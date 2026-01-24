console.log(" RESTAURANT CONTROLLER LOADED");
import { Request,Response} from "express";
import {T} from "../libs/types/common";
import MemberService from "../models/Member.service";
import { MemberInput , LoginInput } from "../libs/types/member";
import { MemberType } from "../libs/enums/member.enum";

const restaurantController:T={};

restaurantController.goHome=(req:Request,res:Response)=>{

    try{
     res.send("Home page");
     console.log("Coming HomePage!");
     // Logon , service model , ...
    }catch(err){
      console.log("Error, goHome :",err);
    }

}



restaurantController.getLogin=(req:Request,res:Response)=>{

    try{
     console.log("Coming LoginPage!");

     res.send("login page");


    }catch(err){
      console.log("Error, goLogin :",err);
    }

}
// --------------------------- post ------------------


restaurantController.processLogin = async(req:Request,res:Response)=>{

    try{
     console.log("Coming processLogin!", req.body);
      const input: LoginInput = req.body;
      const memberService = new MemberService();
      const result = await memberService.processLogin(input);
     res.send(result);


    }catch(err){
      console.log("Error, processLogin :",err);
      res.send(err);
    }

}

// ------------------- post --------------------

restaurantController.getSignup=(req:Request,res:Response)=>{

    try{
     console.log("Coming SignUp Page!");

     res.send("signUp page");

    }catch(err){
      console.log("Error, signUp :",err);
    }

}
restaurantController.processSignup= async (req:Request,res:Response)=>{

    try{
     console.log("Coming process SignUp Page!");
     console.log("Body :", req.body);

      const newMember:MemberInput = req.body;
      newMember.memberType = MemberType.RESTAURANT;
     const memberService = new MemberService();
     const result = await memberService.processSignup(newMember);

     res.send("process signUp page");

    }catch(err){
      console.log("Error, process signUp :",err);
    }

}
export default restaurantController;