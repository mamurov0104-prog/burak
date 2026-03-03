import {T} from "../libs/types/common";
import Errors, { Message } from "../libs/Errors";
import { ProductInput , Product , ProductUpdateInput, ProductInquiry } from "../libs/types/product";
import ProductModel from "../schema/Product.model";
import { HttpCode } from "../libs/Errors";
import { shapeIntoMongooseObjectId } from "../libs/config";
import { ProductStatus } from "../libs/enums/product.enum";
import { ObjectId } from "mongoose";
class ProductService{
 private readonly productModel;
 constructor(){
    this.productModel = ProductModel ;
 }



 /* >-----< getProducts  started>-----< */

public async getProducts(inquiry: ProductInquiry): Promise<Product[]>{ // Promise<Product>

const match: T = { productStatus:ProductStatus.PROCESS };
if(inquiry.productCollection) match.productCollection = inquiry.productCollection;
if(inquiry.search){ 
   match.productName = {$regex: new RegExp(inquiry.search, "i")} //i = flag
}
const sort: T = inquiry.order === "productPrice"
 ? {[inquiry.order]:1} // dynamic key
 : {[inquiry.order]:-1};
 const result = await this.productModel.aggregate([
  { $match: match },
  { $sort: sort},
  { $skip: (inquiry.page * 1 - 1) * inquiry.limit}, // agar page 2 bolda natija 3 X1,2,3
  { $limit: inquiry.limit * 1}                      // 3 => 4,5,6 natija boladi
 ]).exec();
if(!result) throw new Errors(HttpCode.NOT_FOUND , Message.NO_DATA_FOUND); 
return result;

}
/* >-----< getProducts  finished>-----< */

/* >-----< getProduct  started>-----< */

public async getProduct(
   memberId:ObjectId 
   | null 
   , id: string): Promise<any>{ 
const productId = shapeIntoMongooseObjectId(id);
let result = await this.productModel
.findOne({
   _id:productId ,
   productStatus:ProductStatus.PROCESS,
}).exec();
if(!result) throw new Errors(HttpCode.NOT_FOUND , Message.NO_DATA_FOUND); 
//TODO 
return result;

}
/* >-----< getProduct  finished>-----< */




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