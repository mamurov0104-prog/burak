import Errors, { Message } from "../libs/Errors";
import { ProductInput , Product , ProductUpdateInput } from "../libs/types/product";
import ProductModel from "../schema/Product.model";
import { HttpCode } from "../libs/Errors";
import { shapeIntoMongooseObjectId } from "../libs/config";

class ProductService{
 private readonly productModel;
 constructor(){
    this.productModel = ProductModel ;
 }

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