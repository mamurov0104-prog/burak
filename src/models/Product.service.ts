import {T} from "../libs/types/common";
import Errors, { Message } from "../libs/Errors";
import { ProductInput , Product , ProductUpdateInput, ProductInquiry } from "../libs/types/product";
import ProductModel from "../schema/Product.model";
import { HttpCode } from "../libs/Errors";
import { shapeIntoMongooseObjectId } from "../libs/config";
import { ProductStatus } from "../libs/enums/product.enum";
import { ObjectId } from "mongoose";
import ViewService from "./View.service";
import { ViewInput } from "../libs/types/view";
import { ViewGroup } from "../libs/enums/view.enum";
class ProductService{
 private readonly productModel;
 public viewService
 constructor(){
    this.productModel = ProductModel;
    this.viewService = new ViewService;
 }

/* >-----< getProducts  started>-----< */

/**
 * Bu metod ProductService objectiga tegishli.
 * 
 * Qanday o‘qiladi:
 * → ProductService objectining getProducts metodini chaqirdik
 * → unga argument sifatida ProductInquiry objectini uzatdik
 * → metod Promise<Product[]> qaytaradi
 */
public async getProducts(inquiry: ProductInquiry): Promise<Product[]> {

  /**
   * 1 MATCH (Filter) OBYEKTINI YASASH
   * 
   * Bu yerda biz MongoDB uchun filter object tayyorlayapmiz.
   * Avval default qoida qo‘yamiz:
   * Faqat PROCESS statusdagi productlar chiqsin.
   */
  const match: T = { productStatus: ProductStatus.PROCESS };


  /**
   * 2 AGAR COLLECTION FILTER KELGAN BO‘LSA
   * 
   * Masalan:
   * frontenddan productCollection=DRINK kelsa,
   * match objectiga qo‘shamiz.
   * 
   * Natijada filter quyidagicha bo‘ladi:
   * {
   *   productStatus: PROCESS,
   *   productCollection: DRINK
   * }
   */
  if (inquiry.productCollection)
    match.productCollection = inquiry.productCollection;


  /**
   * 3 AGAR SEARCH PARAMETR KELGAN BO‘LSA
   * 
   * Masalan:
   * search=cola
   * 
   * Bu yerda biz MongoDB regex search ishlatyapmiz.
   * "i" flag → katta-kichik harf farqsiz qidiradi.
   */
  if (inquiry.search) {
    match.productName = {
      $regex: new RegExp(inquiry.search, "i"),
    };
  }


  /**
   * 4 SORT OBYEKTINI YASASH
   * 
   * inquiry.order frontenddan keladi.
   * Masalan:
   * order = "productPrice"
   * 
   * Agar productPrice bo‘lsa o‘sish tartibida (1)
   * aks holda kamayish tartibida (-1)
   * 
   * Dynamic key ishlatyapmiz:
   * [inquiry.order] → bu stringni keyga aylantiradi
   */
  const sort: T =
    inquiry.order === "productPrice"
      ? { [inquiry.order]: 1 }
      : { [inquiry.order]: -1 };


  /**
   * 5 MONGODB AGGREGATE PIPELINE
   * 
   * Qanday o‘qiladi:
   * → productModel ustida aggregate ishga tushirdik
   * → bir nechta bosqichli pipeline ishlatyapmiz
   */
  const result = await this.productModel
  // nega array korinishida deyilsa ozining ichki tartibiga ega objectlar toplami edi
    .aggregate([

      /**
       * $match
       * Tayyorlagan filter objectimiz asosida
       * kerakli productlarni tanlab oladi.
       */
      { $match: match },

      /**
       * $sort
       * Tanlangan productlarni tartiblaydi.
       */
      { $sort: sort },

      /**
       * $skip
       * Pagination uchun ishlatiladi.
       * 
       * Formula:
       * (page - 1) * limit
       * 
       * Masalan:
       * page = 2
       * limit = 3
       * 
       * (2 - 1) * 3 = 3
       * 
       * Demak birinchi 3 ta elementni tashlab,
       * keyingilarini oladi.
       */
      { $skip: (inquiry.page - 1) * inquiry.limit },
 
      /**
       * $limit 
       * Nechta product chiqarishni belgilaydi.
       */
      { $limit: inquiry.limit },

    ])
    .exec();


  /**
   * 6 AGAR NATIJA TOPILMASA
   * 
   * result null yoki undefined bo‘lsa
   * custom error tashlaymiz.
   */
  if (!result)
    throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);


  /**
   *  NATIJANI CONTROLLERGA QAYTARAMIZ
   * 
   * Bu yerda business logic tugadi.
   * Endi natija controllerga boradi,
   * controller esa frontendga yuboradi.
   */
  return result;
}

/* >-----< getProducts  finished>-----< */


/* >-----< getProduct started >-----< */
/**

 * Bu service metodi frontenddan kelgan product ID bo'yicha
 * bitta productni DBdan topadi. Agar foydalanuvchi login qilgan bo'lsa,
 * productni ko'rish logini tekshiradi. Agar foydalanuvchi avval bu productni
 * ko'rmagan bo'lsa, view logini insert qiladi va productViews countni oshiradi.
 *
 * Qadamlar:
 * 1 Product IDni Mongoose ObjectId formatiga o'zgartirish
 * 2 Productni DBdan topish (faqat faol productlar)
 * 3 Agar product topilmasa, NOT_FOUND error
 * 4 Agar member login qilgan bo'lsa:
 *      - ViewInput object tayyorlash
 *      - Foydalanuvchi avval ko'rganini tekshirish
 *      - Agar yangi view bo'lsa:
 *          • viewService orqali insert qilish
 *          • productViews ni +1 qilish
 * 5 Natijani return qilish
 */
public async getProduct(
  memberId: ObjectId | null, // Login qilgan member ID yoki null
  id: string                 // URL paramsdan kelgan product ID
): Promise<any> {

  // --- Qadam 1: String IDni Mongoose ObjectId formatiga o'zgartiramiz
  // Mongoose DB querylari faqat ObjectId bilan ishlaydi, shuning uchun stringni o'zgartiramiz
  const productId = shapeIntoMongooseObjectId(id);

  // --- Qadam 2: DBdan productni topish
  // ProductStatus.PROCESS faqat faol (process) productlarni olish uchun
  // Bu yerda findOne bilan bitta product topiladi
  let result = await this.productModel
    .findOne({
      _id: productId,               // qaysi productni izlayotganimiz
      productStatus: ProductStatus.PROCESS, // faqat faol productlar
    })
    .exec(); // exec() async queryni bajaradi va promise qaytaradi

  // --- Qadam 3: Agar product topilmasa, NOT_FOUND xatolik tashlash
  // Bu bilan frontendga "Bu product mavjud emas" degan xabar yuboriladi
  if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

  // --- Qadam 4: Agar member login qilgan bo'lsa, view loggingni tekshirish
  if (memberId) {
    // --- Qadam 4.1: ViewInput object tayyorlash
    // viewRefId = productId, memberId = login qilgan user
    // viewGroup = PRODUCT (view qaysi turga tegishli)
    const input: ViewInput = {
      memberId: memberId,
      viewRefId: productId,
      viewGroup: ViewGroup.PRODUCT,
    };

    // --- Qadam 4.2: viewService orqali tekshiramiz
    // Shu productni foydalanuvchi avval ko'rganmi?
    // Agar mavjud bo'lsa existView ga result keladi, yo'q bo'lsa null
    const existView = await this.viewService.checkViewExistence(input);
    console.log("existView:", !!existView); // true/false

    // --- Qadam 4.3: Agar yangi view bo'lsa (foydalanuvchi avval ko'rmagan bo'lsa)
    if (!existView) {
      console.log("planning to insert new view");

      // --- Qadam 4.3.1: viewService orqali yangi view insert qilamiz
      // Bu DBga memberning productni ko'rganini yozadi
      await this.viewService.insertMemberView(input);

      // --- Qadam 4.3.2: DBda productViews count ni +1 qilish
      // findOneAndUpdate: productni yangilaydi va yangi documentni qaytaradi
      result = await this.productModel.findOneAndUpdate(
        productId,               // qaysi productni yangilash
        { $inc: { productViews: +1 } }, // views countni oshirish
        { new: true }            // update qilingan document qaytadi
      );
    }
  }

  // --- Qadam 5: Natijani return qilish
  // Bu natija frontendga json ko'rinishida yuboriladi
  return result;
}
/* >-----< getProduct finished >-----< */


/* >-----< SPA >-----< */
/* >-----< BSSR  started>-----< */

/* >-----< getAllProducts  started>-----< */

public async getAllProducts(): Promise<any>{ // Promise<Product>

// string => object id 
const result = await this.productModel
.find()
.exec();
if(!result) throw new Errors(HttpCode.NOT_FOUND , Message.NO_DATA_FOUND);
console.log("result:" , result);
return result;

}
/* >-----< getAllProducts  finished>-----< */
/* >-----< CreateNewProduct  started>-----< */

public async createNewProduct(input:ProductInput): Promise<any>{ // Promise<Product>

try{
 return await this.productModel.create(input);
}catch(err){
   console.error("Error , model : createNewProduct :" , err);
throw new Errors(HttpCode.BAD_REQUEST , Message.CREATED_FAILED);
}


}
/* >-----< CreateNewProduct   finished>-----< */
/* >-----< updateChosenProduct  started>-----< */

public async updateChosenProduct(id:string , input:ProductUpdateInput): Promise<any>{ // Promise<Product>

// string => object id 
id = shapeIntoMongooseObjectId(id);
const result = await this.productModel
.findOneAndUpdate({_id : id}, input,{new: true})
.exec();
if(!result) throw new Errors(HttpCode.NOT_MODIFIED , Message.UPDATED_FAILED);
console.log("result:" , result);
return result;

}
/* >-----< updateChosenProduct  finished>-----< */
/* >-----< BSSR  finished>-----< */




}
export default ProductService;