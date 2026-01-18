import { Request,Response} from "express";
import {T} from "../libs/types/common";
import MemberService from "../models/Member.service";
const restaurantController:T={};

restaurantController.goHome=(req:Request,res:Response)=>{

    try{
     res.send("Home page");

    }catch(err){
      console.log("Error, goHome :",err);
    }

}



restaurantController.getLogin=(req:Request,res:Response)=>{

    try{
     res.send("login page");

    }catch(err){
      console.log("Error, goLogin :",err);
    }

}


restaurantController.getSignup=(req:Request,res:Response)=>{

    try{
     res.send("signUp page");

    }catch(err){
      console.log("Error, signUp :",err);
    }

}
export default restaurantController;