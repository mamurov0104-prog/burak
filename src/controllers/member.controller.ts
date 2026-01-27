console.log(" MEMBER CONTROLLER LOADED");

import { Request,Response} from "express";
import {T} from "../libs/types/common";
import MemberService from "../models/Member.service";
import { MemberInput , LoginInput } from "../libs/types/member";
import Errors from "../libs/Errors";
// import { MemberType } from "../libs/enums/member.enum";
// import { json } from "node:stream/consumers";

const memberService = new MemberService();
 
const memberController:T={};
// ------------------------------------------------------- < SignUp POST started  > --------------------------------------------


        memberController.signup = async (req:Request,res:Response)=>{

            try{
            console.log("Coming  SignUp Page!");
            console.log("Body :", req.body);

            const input:MemberInput = req.body,
            //   newMember.memberType = MemberType.RESTAURANT;
            result : any = await memberService.signup(input);
            // TODO tokens
            //  const result : Member = await memberService.signup(input);

            res.json({member: result});

            }catch(err){
            console.log("Error, signUp :",err);
            //   res.json({})
            }

        }
// ------------------------------------------------------- < SignUp POST Finished  > --------------------------------------------

// ------------------------------------------------------- < login POST started  > --------------------------------------------

        memberController.login = async(req:Request,res:Response)=>{

            try{
            console.log("Coming Login!", req.body); 
            
            const input: LoginInput = req.body,
            //   memberService = new MemberService(),
            result = await memberService.login(input);
            // TODO tokens
            res.json({member: result});


            }catch(err){
            console.log("Error, Login :",err);
            if(err instanceof Errors) res.status(err.code).json(err)
                else res.status(Errors.standard.code).json(Errors.standard);
            //   res.json({});
            }

        }

// ------------------------------------------------------- < login POST finished  > --------------------------------------------


export default memberController;