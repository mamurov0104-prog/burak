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
            /*public asinxron processSignup methodini MemberInput typedagi input degan
    parametri bor va u asinxron bo’lganligi uchun bizga typypi Member type bolgan Promiseda
    malumot qaytaradi */
           const exist = await this.memberModel
       .findOne({memberType:MemberType.RESTAURANT})
       .exec();
            /* member skima modelimizni (memberModel) ichidan findOne statik methodini
        chaqirib unga bitta object argument berdik, va query ni yakunlash uchun exec()
        methodini chaqirdik. Hamda bu method javobini kutib, undan chiqqan natijani
        exist konstantasiga saqladik */
       console.log("exist:",exist);
       if(exist){
            throw new Errors(HttpCode.BAD_REQUEST,Message.CREATED_FAILED);
            /*Keyingi qatorda, agar ana shu exist bo’ladigan bo’lsa o’zimiz xatolik
             hosil qildik. U xato o’zimiz tuzib olgan maxsus code va message (habar) lardan iborat. */

       };
       console.log("memberPassword before",input.memberPassword);
       const salt = await bcrypt.genSalt();
       /*
            Agar exist bo’lmaydigan bosa mantig’imiz keyingi qatorga o’tadi. Biz bcrypt
        degan external package (tashqi paket) o’rnatdik hamda shu bcrypt objecti ichidan
        genSalt() degan methodni chaqirdik va uni javobini kutib, salt degan konstantaga
        saqladik.
       */
       input.memberPassword = await bcrypt.hash(input.memberPassword , salt);
            /*Hamda, o’sha bcrypt packagemiz ichidan hash() methodini chaqirib unga 2 ta
        argument berdik. Birinchi argumenti input parametri ichidagi memberPassword
        va ikkinchi argument esa yuqorida hosil qilgan salt konstantamizning qiymati
        bo’ldi. Va uni javobini kutib inputni ichidagi memberPassword ga tengladik. */
       console.log("memberPassword after",input.memberPassword);

        try{
                /*  Va biz yana try catch blogidan foydalandik - errorlarni yaxshi handle qilish uchun.
        Try blogi ichida, member skima model (memberModel) ichidan create() degan
        static methodni chaqirib unga inputni argument sifatida berdik va javobini kutib
        result degan konstantaga saqladik*/
        const result = await this.memberModel.create(input);
   

        result.memberPassword='';// Hamda ana shu result ni memberPasswordini bo’sh stringa tenglab qoydik
        return result; // Oxirida esa o’sha result ni qaytarib yubordik
        }catch(err){
            throw new Errors(HttpCode.BAD_REQUEST,Message.CREATED_FAILED);
            /*Agar try blogi ichida qandaydur xatolik yuzaga kelsa uni catch qismida 
            ushlab olib o’zimiz yasagan error yani xatolikni qaytardik. */
        }
        
}
// ------------------------------------------------------- < login started  > --------------------------------------------
public async processLogin(input:LoginInput):Promise<any>{
    /* public asinxron processLogin methodini LoginInput typedagi input degan
parametri bor va u asinxron bo’lganligi uchun bizga Promiseda, yani Member typeda
malumot qaytaradi. */
const member = await this.memberModel
/*member skima modelimizni (memberModel) ichidan findOne statik methodini
chaqirib unga 2 ta  object argument berdik, va query ni yakunlash uchun exec()
methodini chaqirdik. */
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
// const result = await this.memberModel.findById(member._id).exec();
    // console.log("result:",result);
return  await this.memberModel.findById(member._id).exec();

}
// ------------------------------------------------------- < login finished  > --------------------------------------------

// ------------------------------------------------------- < getUsers started  > --------------------------------------------

   public async getUsers():Promise<any>{
   const result = await this.memberModel
   .find({memberType:MemberType.USER})
   .exec();
   if(!result) throw new Errors(HttpCode.NOT_FOUND , Message.NO_DATA_FOUND);
   return result;
   }

// ------------------------------------------------------- < getUsers finished  > --------------------------------------------


};
export default MemberService;