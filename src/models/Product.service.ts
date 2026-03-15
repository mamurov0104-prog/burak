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

public async getProducts(inquiry: ProductInquiry): Promise<Product[]> {


  const match: T = { productStatus: ProductStatus.PROCESS };

  if (inquiry.productCollection)
    match.productCollection = inquiry.productCollection;


  if (inquiry.search) {
    match.productName = {
      $regex: new RegExp(inquiry.search, "i"),
    };
  }


 
  const sort: T =
    inquiry.order === "productPrice"
      ? { [inquiry.order]: 1 }
      : { [inquiry.order]: -1 };


  const result = await this.productModel
    .aggregate([

     
      { $match: match },

    
      { $sort: sort },

      
      { $skip: (inquiry.page - 1) * inquiry.limit },
 
     
      { $limit: inquiry.limit },

  {
    $project: {
      productName: 1,
      productDesc: 1,
      productImages: 1,
      productViews: 1,
      productPrice: 1,
      productCollection: 1
    }
  }
    ])
    .exec();



  if (!result)
    throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);


 
  return result;
}

/* >-----< getProducts  finished>-----< */


/* >-----< getProduct started >-----< */

public async getProduct(
  memberId: ObjectId | null, // Login qilgan member ID yoki null
  id: string                 // URL paramsdan kelgan product ID
): Promise<any> {

  const productId = shapeIntoMongooseObjectId(id);


  let result = await this.productModel
    .findOne({
      _id: productId,               
      productStatus: ProductStatus.PROCESS, 
    })
    .exec(); 

  if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

  if (memberId) {
    
    const input: ViewInput = {
      memberId: memberId,
      viewRefId: productId,
      viewGroup: ViewGroup.PRODUCT,
    };

    const existView = await this.viewService.checkViewExistence(input);
    console.log("existView:", !!existView); // true/false

    if (!existView) {
      console.log("planning to insert new view");

  
      await this.viewService.insertMemberView(input);


      result = await this.productModel.findOneAndUpdate(
        productId,              
        { $inc: { productViews: +1 } }, 
        { new: true }           
      );
    }
  }

  return result;
}
/* >-----< getProduct finished >-----< */


/* >-----< SPA >-----< */
/* >-----< BSSR  started>-----< */

/* >-----< getAllProducts  started>-----< */

public async getAllProducts(): Promise<Product[]> {

const result = await this.productModel
.find()
.exec();

if(!result.length)
throw new Errors(HttpCode.NOT_FOUND , Message.NO_DATA_FOUND);

console.log("result:" , result);

return result as unknown as Product[];

}
/* >-----< getAllProducts  finished>-----< */
/* >-----< CreateNewProduct  started>-----< */

public async createNewProduct(input:ProductInput): Promise<Product>{ // Promise<Product>

try{
 const result = await this.productModel.create(input);

return result as unknown as Product;
}catch(err){
   console.error("Error , model : createNewProduct :" , err);
throw new Errors(HttpCode.BAD_REQUEST , Message.CREATED_FAILED);
}


}
/* >-----< CreateNewProduct   finished>-----< */
/* >-----< updateChosenProduct  started>-----< */

public async updateChosenProduct(id:string , input:ProductUpdateInput): Promise<Product>{ // Promise<Product>

// string => object id 
id = shapeIntoMongooseObjectId(id);
const result = await this.productModel
.findOneAndUpdate({_id : id}, input,{new: true})
.exec();
if(!result) throw new Errors(HttpCode.NOT_MODIFIED , Message.UPDATED_FAILED);
console.log("result:" , result);
return result as unknown as Product;

}
/* >-----< updateChosenProduct  finished>-----< */
/* >-----< BSSR  finished>-----< */




}
export default ProductService;