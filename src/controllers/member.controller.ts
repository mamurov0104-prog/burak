console.log(" MEMBER CONTROLLER LOADED");

import { Request,Response} from "express";
import {T} from "../libs/types/common";
import MemberService from "../models/Member.service";
import { MemberInput , LoginInput, Member } from "../libs/types/member";
import Errors, { HttpCode, Message } from "../libs/Errors";
import AuthService from "../models/Auth.service";
import { AUTH_TIMER } from "../libs/config";
// import { MemberType } from "../libs/enums/member.enum";
// import { json } from "node:stream/consumers";

const memberService = new MemberService();
const authService = new AuthService();
 
const memberController:T={};
// ------------------------------------------------------- < SignUp POST started  > --------------------------------------------

memberController.signup = async (req: Request, res: Response) => {
  try {
    console.log("signup");
    const input: MemberInput = req.body;
    const result: Member = await memberService.signup(input);
    const token = await authService.createToken(result);
 res.cookie(
        "accessToken" , 
        token , 
        {maxAge:AUTH_TIMER * 3600 * 1000,
        httpOnly:false});
    console.log("token =>", token);

    res.status(HttpCode.CREATED).json({ member: result , accessToken: token });
  } catch (err) {
    console.log("Error, signup:", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};
// ------------------------------------------------------- < SignUp POST Finished  > --------------------------------------------

// ------------------------------------------------------- < login POST started  > --------------------------------------------

       memberController.login = async (req: Request, res: Response) => {
  try {
    console.log("login");
    const input: LoginInput = req.body;
    const result = await memberService.login(input);
    const token = await authService.createToken(result);
    res.cookie(
        "accessToken" , 
        token , 
        {maxAge:AUTH_TIMER * 3600 * 1000,
        httpOnly:false});
    console.log("token =>", token);

    res.status(HttpCode.OK).json({ member: result , accessToken: token });
  } catch (err) {
    console.log("Error, login:", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

// ------------------------------------------------------- < login POST finished  > --------------------------------------------

// ------------------------------------------------------- < verifyAuth get started  > --------------------------------------------

memberController.verifyAuth = async (req:Request , res:Response) =>{
    try{
      let member = null;
      const token = req.cookies["accessToken"];
      if(token) member = await authService.checkAuth(token);
      if(!member) throw new Errors(HttpCode.UNAUTHORIZED , Message.NOT_AUTHONTICATED);
      console.log("member : " , member)
      res.status(HttpCode.OK).json({ member: member});

    } catch (err) {
    console.log("Error, verifyAuth:", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
}


// ------------------------------------------------------- < verifyAth get finished  > --------------------------------------------




export default memberController;