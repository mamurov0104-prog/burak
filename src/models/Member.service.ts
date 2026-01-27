console.log(" MEMBER SERVICE LOADED");

import MemberModel from "../schema/Member.model";
import { LoginInput, Member, MemberInput } from "../libs/types/member";
import Errors, { HttpCode, Message } from "../libs/Errors";
import { MemberType } from "../libs/enums/member.enum";
import * as bcrypt from "bcryptjs";
class MemberService{
    private readonly memberModel;
    constructor(){
 this.memberModel=MemberModel;
    }
   

    // ---------------------------- < SPA STARTED > ----------------------------
    
    public async signup(input:MemberInput): Promise<any> {
       const salt = await bcrypt.genSalt();
       input.memberPassword = await bcrypt.hash(input.memberPassword , salt);
 
        try{
        const result = await this.memberModel.create(input);
        result.memberPassword='';
        return result.toJSON();
        }catch(err){
            console.error("Error , modelsignUp process  :", err)
            throw new Errors(HttpCode.BAD_REQUEST,Message.USED_NICK_PHONE);
        }
        
      }




        public async login(input:LoginInput):Promise<any>{
        // Conside member status later
            const member = await this.memberModel
        .findOne( 
            {memberNick:input.memberNick}, 
            {_id:1,memberNick:1,memberPassword:1}) 
        .exec();

        if(!member) throw new Errors(HttpCode.NOT_FOUND,Message.NO_MEMBER_NICK);

        const isMatch = await bcrypt.compare(
            input.memberPassword,
            member.memberPassword);
        if(!isMatch){
            throw new Errors(HttpCode.UNAUTHORIZED,Message.WRONG_PASSWORD);}

        const result = await this.memberModel.findById(member._id).lean().exec();
            console.log("result:",result);
        return result;

        }



    // ---------------------------- < SPA FINISHED > ----------------------------

    public async processSignup(input:MemberInput): Promise<any> {
    // comment ga olingan va commentdan chiqsa ishlaydi !!!
    
           const exist = await this.memberModel
       .findOne({memberType:MemberType.RESTAURANT})
       .exec();
       console.log("exist:",exist);
       if(exist){
            throw new Errors(HttpCode.BAD_REQUEST,Message.CREATED_FAILED);

       };
       console.log("memberPassword before",input.memberPassword);
       const salt = await bcrypt.genSalt();
       input.memberPassword = await bcrypt.hash(input.memberPassword , salt);
       console.log("memberPassword after",input.memberPassword);

        try{
        const result = await this.memberModel.create(input);
        // const tempResult = new this.memberModel(input);
        // const result = await tempResult.save();

        result.memberPassword='';
        return result;
    //    console.log("Passed here !")
        }catch(err){
            throw new Errors(HttpCode.BAD_REQUEST,Message.CREATED_FAILED);
        //    console.log("Error Errror Error", err);
        }
        
}
// ------------------------------------------------------- < login started  > --------------------------------------------
public async processLogin(input:LoginInput):Promise<any>{
const member = await this.memberModel
.findOne( // databasedan foydalanuvchini qidirish 
    {memberNick:input.memberNick},  // nickname bo‘yicha qidiramiz
    {_id:1,memberNick:1,memberPassword:1}) // faqat kerakli fieldlar
    /*
    manabu joyga kelyabdida member service modelning processLogin metodiga kelib , 
    member schema model orqali biz kiritgan memberNickga teng bolgan malumotni DataBasedan 
     qidirmoqda va uni return resulda aslida avval return memberda korganmiz
    */
.exec();

if(!member) throw new Errors(HttpCode.NOT_FOUND,Message.NO_MEMBER_NICK);
/*
Agar foydalanuvchi topilmasa ushbu biz kiritgan error chiqadi
*/
// passwordni tekshirish
const isMatch = await bcrypt.compare(
   
    input.memberPassword, // biz kiritgan password
    member.memberPassword);// database dan kelgan yangi string
if(!isMatch){ // Agar password mos kelmasa: ushbu errorni qaytaradi
    throw new Errors(HttpCode.UNAUTHORIZED,Message.WRONG_PASSWORD);}
    /* Bu yerda biz foydalanuvchining to‘liq ma’lumotlarini 
    olish uchun ID bo‘yicha yana query qilamiz.
    Natija controllerga qaytadi 
    va res.send(result) orqali frontendga yuboriladi. */
const result = await this.memberModel.findById(member._id).exec();
    console.log("result:",result);
return result;

}
// ------------------------------------------------------- < login finished  > --------------------------------------------


};
export default MemberService;