/* =============================================
  ViewService
  - Foydalanuvchi productni ko'rganligini tekshirish va 
    yangi view logini yaratish uchun ishlatiladi
  - Har bir funksiya: DB query + error handling + service logika
============================================= */

import Errors, { HttpCode, Message } from "../libs/Errors";
import { View, ViewInput,  } from "../libs/types/view";
import ViewModel from "../schema/View.model";

/**

 * Bu service foydalanuvchi (member) tomonidan product yoki boshqa entityni
 * ko‘rganligini tekshiradi va kerak bo‘lsa view logini yaratadi.
 *
 * Asosiy vazifalari:
 * 1 checkViewExistence – foydalanuvchi avval ko‘rganligini tekshiradi
 * 2 insertMemberView – yangi view logini yaratadi
 */
class ViewService {
  // --- Qadam 1: viewModel - MongoDB View collection bilan ishlash
  private readonly viewModel;

  constructor() {
    // MongoDB model orqali View collection bilan ishlash
    this.viewModel = ViewModel; 
  }

  /* =============================================
      1 checkViewExistence
  ============================================= */
  /**
 
   * DBda tekshiradi, foydalanuvchi avval productni ko'rgan yoki yo'q
   * Agar mavjud bo'lsa, DB document qaytaradi, yo'q bo'lsa null
   *
   * @param input - ViewInput object:
   *    - memberId: ko‘rgan user ID
   *    - viewRefId: qaysi product yoki entity ko‘rilgan
   *    - viewGroup: product, article va boshqa view turlari
   */
  public async checkViewExistence(input: ViewInput): Promise<any> {
    // --- Qadam 1: findOne query
    // memberId va viewRefId bo‘yicha DBni tekshiradi
    // Agar topilsa document qaytaradi
    // Agar yo‘q bo‘lsa null qaytaradi
    return await this.viewModel
      .findOne({
        memberId: input.memberId,   // login qilgan foydalanuvchi
        viewRefId: input.viewRefId, // qaysi product yoki entity
      })
      .exec(); // exec() – async query va Promise qaytaradi
  }

  /* =============================================
      2 insertMemberView
  ============================================= */
  /**
 
   * Yangi view yaratadi, DBga yozadi
   * Agar xatolik yuz bersa, custom Errors throw qiladi
   *
   * param input - ViewInput object:
   *    - memberId: login qilgan user
   *    - viewRefId: qaysi product yoki entity
   *    - viewGroup: view turini aniqlash
   *
   * return Created View document
   */
  public async insertMemberView(input: ViewInput): Promise<any> {
    try {
      // --- Qadam 1: DBga yangi view create qilish
      // Bu foydalanuvchi productni ko‘rganini saqlaydi
      return await this.viewModel.create(input);

    } catch (error) {
      // --- Qadam 2: Agar xatolik yuz bersa, logga chiqarish
      console.log("ERROR: insertMemberView", error);

      // --- Qadam 3: Custom error throw qilish
      // Frontendga CREATED_FAILED xabarini yuboradi
      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATED_FAILED);
    }
  }
}

export default ViewService;













































// import Errors, { HttpCode } from "../libs/Errors";
// import { View, ViewInput } from "../libs/types/view";
// import ViewModel from "../schema/View.model";
// import { Message } from "../libs/Errors";
// // import { View } from "../libs/types/view"

// class ViewService{
//     static checkViewExistence(input: ViewInput) {
//        throw new Error("Method not implemented.");
//     }
//     private readonly viewModel;
//     constructor(){
//         this.viewModel=ViewModel
//     }
//     public async checkViewExistence( input:ViewInput): Promise<any>{
//       return await this.viewModel
//       .findOne( {memberId:input.memberId , viewRefId:input.viewRefId})
//       .exec()
//     }
//       public async insertMemberView(input: ViewInput): Promise<any> {
//     try {
//       return await this.viewModel.create(input);
//     } catch (error) {
//       console.log("ERROR: insertMemberView", error);
//       throw new Errors(HttpCode.BAD_REQUEST, Message.CREATED_FAILED);
//     }
//   }
// }
// export default ViewService;