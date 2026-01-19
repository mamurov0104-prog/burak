import { Request,Response} from "express";
import {T} from "../libs/types/common";
import MemberService from "../models/Member.service";
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


restaurantController.getSignup=(req:Request,res:Response)=>{

    try{
     console.log("Coming SignUp Page!");

     res.send("signUp page");

    }catch(err){
      console.log("Error, signUp :",err);
    }

}
export default restaurantController;