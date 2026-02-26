console.log(" MEMBER SERVICE LOADED");

import MemberModel from "../schema/Member.model";
import { LoginInput, Member, MemberInput , MemberUpdateInput} from "../libs/types/member";
import Errors, { HttpCode, Message } from "../libs/Errors";
import { MemberStatus, MemberType } from "../libs/enums/member.enum";
import * as bcrypt from "bcryptjs";
import { shapeIntoMongooseObjectId } from "../libs/config";
class MemberService{
    private readonly memberModel;
    constructor(){
 this.memberModel=MemberModel;
    }
   

    // ---------------------------- < SPA STARTED > ----------------------------
    
   // Bu funksiya memberModel orqali a'zo yaratadi
// Kiruvchi param: input (MemberInput)
// Chiquvchi natija: yaratilgan member JSON formatida

public async signup(input: MemberInput): Promise<any> {
  // 1. Passwordni xavfsizlash (hash qilish)
  const salt = await bcrypt.genSalt(); // Salt generatsiya qilamiz
  input.memberPassword = await bcrypt.hash(input.memberPassword, salt); // Passwordni hash qilamiz

  try {
    // 2. Member yaratish
    const result = await this.memberModel.create(input);

    // 3. Natijada passwordni bo'shatamiz, chunki clientga yubormaslik kerak
    result.memberPassword = '';

    // 4. JSON formatida qaytaramiz
    return result.toJSON();
  } catch (err) {
    // Agar DB constraint yoki unique error bo'lsa
    console.error("Error, model signup process:", err);

    // Xatolikni custom Errors orqali tashlaymiz
    throw new Errors(HttpCode.BAD_REQUEST, Message.USED_NICK_PHONE);
  }
}




       // Bu funksiya: member login jarayonini bajaradi
// Kiruvchi param: input (LoginInput)
// Chiquvchi natija: muvaffaqiyatli login qilgan member (JSON formatida)
public async login(input: LoginInput): Promise<any> {
  //  DBdan memberNick bo‘yicha a'zo topamiz
  // Agar memberStatus DELETE bo'lsa, qidiruvdan chiqariladi
  const member = await this.memberModel
    .findOne(
      {
        memberNick: input.memberNick,             // Nick bo‘yicha qidirish
        memberStatus: { $ne: MemberStatus.DELETE } // O'chirilganlar qidiruvdan chiqariladi
      },
      {
        _id: 1,            // Qaytariladigan fieldlar
        memberNick: 1,
        memberPassword: 1, 
        memberStatus: 1
      }
    )
    .exec(); // Queryni bajarish va Promise qaytarish

  // Agar member topilmasa, 404 xato
  if (!member) throw new Errors(HttpCode.NOT_FOUND, Message.NO_MEMBER_NICK);

  //  Agar member BLOCK holatda bo‘lsa, 403 xato
  if (member.memberStatus === MemberStatus.BLOCK) {
    throw new Errors(HttpCode.FORBIDDEN, Message.BLOCKED_USER);
  }

  //  Passwordni tekshiramiz
  // input.password vs DBdagi hashed password
  const isMatch = await bcrypt.compare(input.memberPassword, member.memberPassword);

  // Agar password mos kelmasa, 401 xato
  if (!isMatch) {
    throw new Errors(HttpCode.UNAUTHORIZED, Message.WRONG_PASSWORD);
  }

  //  Agar hammasi to‘g‘ri bo‘lsa, full member ma’lumotini olish
  // lean() – Mongoose documentni oddiy JS objectga aylantiradi
  const result = await this.memberModel.findById(member._id).lean().exec();

  // Logga natijani chiqarish
  console.log("result:", result);

  // Natijani return qilamiz
  return result;
}


       // Bu funksiya memberService ichida a'zo tafsilotlarini olish uchun ishlatiladi
// Kiruvchi param: member (MongoDB document yoki object) 
// Chiquvchi natija: member tafsilotlari yoki xato

public async getMemberDetail(member: Member): Promise<any> {
  // member._id ni Mongoose ObjectId ga o‘giramiz
  const memberId = shapeIntoMongooseObjectId(member._id);

  // DB dan active statusga ega a'zo topamiz
  const result = await this.memberModel
    .findOne({
      _id: memberId,                 // ID bo‘yicha qidirish
      memberStatus: MemberStatus.ACTIVE, // Active statusga ega bo‘lishi shart
    })
    .exec(); // query ni bajarish

  // Agar natija topilmasa, NOT_FOUND xato tashlanadi
  if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

  // Agar topilsa, natijani qaytaramiz
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
     /* Bu yerda SERVICE:
     * - qaysi userlar olinishi kerak
     * - qaysi filter ishlatilishi
     * - qachon error berilishi
     * ni hal qiladi
     */

   const result = await this.memberModel
   .find({memberType:MemberType.USER})
   /*
   Ya’ni MongoDB ga shunday deyilyapti:

    “memberType degan fieldi USER bo‘lganlarni olib kel” aks xolda hamma
     memberni olib keladi yani adminni ozini ham
   */
   .exec();
   if(!result) throw new Errors(HttpCode.NOT_FOUND , Message.NO_DATA_FOUND);
   
    /**
     * Agar DB dan hech nima qaytmasa,
     * Service xato tashlaydi
     */
   return result;
   }

// ------------------------------------------------------- < getUsers finished  > --------------------------------------------

// ------------------------------------------------------- < updateChosenUser started  > --------------------------------------------

   public async updateChosenUser(input:MemberUpdateInput):Promise<any>{
    
    /**
     * input — controllerdan kelgan data
     * Bu data frontenddan kelganligi sababli
     * unga to‘liq ishonib bo‘lmaydi
     */

    /**
     * 1 MongoDB ObjectId formatlash
     *
     * Frontend _id ni string qilib yuboradi
     * MongoDB esa ObjectId format kutadi
     */
    input._id = shapeIntoMongooseObjectId(input._id);
    
    /**
     * 2 Userni DB dan topib yangilash
     *
     * findByIdAndUpdate:
     * - birinchi parametr → qaysi hujjat
     * - ikkinchi parametr → yangi ma’lumotlar
     * - new: true → yangilangan hujjatni qaytar
     */
   const result = await this.memberModel
   .findByIdAndUpdate(
    {_id:input._id} /*Qaysi user yangilanadi? degan savolga javob  yani Frontend _id yuborgan
                     Biz uni ObjectId ga aylantirdik MongoDB shu _id ga mos hujjatni qidiradi*/
    ,input, /* Qaysi ma’lumotlar bilan yangilanadi? yani {
                _id: ObjectId("65fa..."),
                memberNick: "Ali",
                memberStatus: "ACTIVE"
                } */
    {new:true , runValidators:true})/* Bu option yani “Yangilangan holatni qaytaraman” degandek gap  */
   .exec();
   if(!result) throw new Errors(HttpCode.NOT_MODIFIED , Message.UPDATED_FAILED);
     /**
     * 3 Agar user topilmasa yoki update bo‘lmasa
     * Service error throw qiladi
     *
     * Bu error controller tomonidan tutib olinadi
     */
   return result;
   }

// ------------------------------------------------------- < updateChosenUser finished  > --------------------------------------------

};
export default MemberService;