console.log(" MEMBER CONTROLLER LOADED");

import { Request,Response} from "express";
import {T} from "../libs/types/common";
import MemberService from "../models/Member.service";
import { MemberInput , LoginInput, Member } from "../libs/types/member";
import Errors from "../libs/Errors";
import AuthService from "../models/Auth.service";
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
    console.log("token: ", token);

    res.json({ member: result });
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
    console.log("token =>", token);

    res.json({ member: result });
  } catch (err) {
    console.log("Error, login:", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

// ------------------------------------------------------- < login POST finished  > --------------------------------------------


export default memberController;